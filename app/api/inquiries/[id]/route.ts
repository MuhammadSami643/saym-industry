import { NextResponse } from 'next/server';
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '@/app/lib/inquiriesStore';

// GET /api/inquiries/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const all = getAllInquiries();
    const item = all.find(i => i.id === id);

    if (!item) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/inquiries/[id] -> Update inquiry status (e.g. 'contacted', 'quoted', 'closed')
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const updated = await updateInquiryStatus(id, status);

    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/inquiries/[id] -> Delete an inquiry
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = await deleteInquiry(id);

    return NextResponse.json({
      success: true,
      message: ok ? 'Inquiry deleted successfully' : 'Inquiry removed'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

