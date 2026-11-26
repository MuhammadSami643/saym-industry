import { NextResponse } from 'next/server';
import { getBlogBySlug, updateBlog, deleteBlog, getAllBlogs } from '@/app/lib/blogsStore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const all = getAllBlogs();
    const blog = all.find((b) => b.id === id || b.slug === id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateBlog(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully.',
      data: updated,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteBlog(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Article not found or could not be deleted.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article deleted permanently.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
