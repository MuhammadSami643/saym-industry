import { NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '@/app/lib/blogsStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let blogs = getAllBlogs();
    if (status === 'published' || status === 'draft') {
      blogs = blogs.filter((b) => b.status === status);
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err: any) {
    console.error('API /api/blogs GET error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const created = await createBlog(body);
    return NextResponse.json({
      success: true,
      message: 'Article saved successfully.',
      data: created,
    }, { status: 201 });
  } catch (err: any) {
    console.error('API /api/blogs POST error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
