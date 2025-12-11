import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const eventType = payload.event;
    const data = payload.data;

    // Only process successful payments
    if (eventType === "payment.success" && data.id) {
      const checkoutId = data.id;

      // Update order in Supabase and fetch the updated row
      const { data: order, error } = await supabase
        .from("orders")
        .update({
          status: "paid",
          payment_reference: data.id,
        })
        .eq("order_id", checkoutId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      if (!order) throw new Error("Order not found");
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    // Safely narrow the error type
    if (error instanceof Error) {
      console.error("Update handler error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // If it’s not an instance of Error
    console.error("Unknown error:", error);
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}