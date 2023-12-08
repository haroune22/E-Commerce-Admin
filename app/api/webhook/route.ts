
import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import db from "@/lib/db"

export async function POST(req: Request) {
//getting text because it is a webhhok
  const body = await req.text()
//getting the signature
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  };

//getting the session & address if there is
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

//creating the address
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

//generating address in to one single string
  const addressString = addressComponents.filter((c) => c !== null).join(', ');

//checkin the event that we want to listing to
  if (event.type === "checkout.session.completed") {
    //updating the order
    const order = await db.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItems: true,
      }
    });

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    //updating the products isArchived to true
    await db.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true
      }
    });
  }

  return new NextResponse(null, { status: 200 });
};