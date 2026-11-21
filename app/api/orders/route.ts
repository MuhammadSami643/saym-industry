import { NextResponse } from 'next/server';
import { getAllProductionOrders, getProductionOrderById, createProductionOrderFromInquiry } from '@/app/lib/ordersStore';
import { updateInquiryStatus } from '@/app/lib/inquiriesStore';

// GET /api/orders -> Fetch single order by query ?id=... or all
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      const order = getProductionOrderById(orderId);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    const all = getAllProductionOrders();
    return NextResponse.json({ success: true, count: Object.keys(all).length, orders: all });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/orders -> Convert Inquiry to Production Order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inquiryId, clientName, brand, country, item, quantity, fabricSpec, targetDays, carrier } = body;

    if (!clientName || !item) {
      return NextResponse.json({ error: 'Client name and garment item are required.' }, { status: 400 });
    }

    const newOrder = createProductionOrderFromInquiry({
      inquiryId,
      clientName,
      brand: brand || clientName,
      country,
      item,
      quantity,
      fabricSpec,
      targetDays: targetDays ? parseInt(targetDays, 10) : 18,
      carrier
    });

    // If an inquiry was converted, update its status to 'closed' or 'completed'
    if (inquiryId) {
      try {
        await updateInquiryStatus(inquiryId, 'closed');
      } catch (inqErr) {
        console.warn('Could not update inquiry status on order creation:', inqErr);
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://binrasoolenterprises.com';
    const trackingUrl = `${siteUrl}/track-order?id=${newOrder.orderId}`;

    return NextResponse.json({
      success: true,
      message: `Production Order ${newOrder.orderId} created successfully!`,
      order: newOrder,
      trackingUrl
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create order' }, { status: 500 });
  }
}
