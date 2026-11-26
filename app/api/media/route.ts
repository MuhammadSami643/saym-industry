import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteMedia, saveSiteMedia, DEFAULT_SITE_MEDIA, SiteMediaData } from '@/app/lib/siteMediaStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getSiteMedia();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Reset to defaults if requested
    if (body.reset) {
      await saveSiteMedia(DEFAULT_SITE_MEDIA);
      revalidatePath('/');
      return NextResponse.json({ success: true, data: DEFAULT_SITE_MEDIA });
    }

    const current = await getSiteMedia();
    const updated: SiteMediaData = {
      hero_slides: Array.isArray(body.hero_slides) ? body.hero_slides : current.hero_slides,
      category_cards: Array.isArray(body.category_cards) ? body.category_cards : current.category_cards,
      featured_product: body.featured_product || current.featured_product,
    };

    const saved = await saveSiteMedia(updated);
    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Failed to write site media to storage' },
        { status: 500 }
      );
    }

    // Revalidate home page and categories page for instant public update
    revalidatePath('/');
    revalidatePath('/categories');

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update media' },
      { status: 500 }
    );
  }
}
