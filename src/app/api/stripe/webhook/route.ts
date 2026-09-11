import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0]?.price.id,
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
          update: {
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0]?.price.id,
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        });
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: {
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
        },
      });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
