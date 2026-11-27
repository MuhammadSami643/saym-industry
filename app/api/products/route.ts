import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/app/lib/supabase';

const DEFAULT_PRODUCTS = [
  // 1. Heavyweight Hoodies & Fleece
  {
    id: 'prod-hoodie-1',
    name: '450 GSM Heavyweight Streetwear Hoodie',
    category: 'Heavyweight Hoodies & Fleece',
    description: 'Custom 450 GSM 100% combed cotton French Terry pullover with double-layer hood, kangaroo pocket and 2x2 ribbed hems.',
    image_url: '/images/catalog/hoodies/heavyweight-pullover-hoodie.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-hoodie-2',
    name: 'Minimalist French Terry Studio Hoodie',
    category: 'Heavyweight Hoodies & Fleece',
    description: '380 GSM pre-shrunk French Terry hoodie with dyed-to-match flat drawstrings and custom woven neck label.',
    image_url: '/images/catalog/hoodies/minimalist-french-terry-hoodie.webp',
    created_at: new Date().toISOString()
  },

  // 2. Streetwear & Outerwear
  {
    id: 'prod-street-1',
    name: 'Oversized Boxy Streetwear Fleece Hoodie',
    category: 'Streetwear & Outerwear',
    description: 'Drop-shoulder boxy cut fleece streetwear hoodie with 3D high-density puff print and relaxed silhouette.',
    image_url: '/images/catalog/hoodies/minimalist-oversized-hoodie.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-street-2',
    name: 'Vintage Acid Washed Streetwear Hoodie',
    category: 'Streetwear & Outerwear',
    description: 'Mineral-washed vintage streetwear pullover with reinforced seam detailing and custom branded hangtags.',
    image_url: '/images/catalog/hoodies/vintage-washed-black-hoodie.webp',
    created_at: new Date().toISOString()
  },

  // 3. Fitness & Activewear
  {
    id: 'prod-fit-1',
    name: 'Slim Fit Tapered Gym Joggers',
    category: 'Fitness & Activewear',
    description: 'Custom slim fit gym joggers in 4-way stretch fleece with concealed zipper pockets, metal aglets and embroidered logo.',
    image_url: '/images/catalog/tracksuits/tapered-fleece-training-pants.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-fit-2',
    name: 'Seamless High-Waist Gym Leggings Set',
    category: 'Fitness & Activewear',
    description: 'Squat-proof 75/25 Nylon Spandex high-waisted compression leggings and matching cross-back sports bra.',
    image_url: '/images/catalog/fitness-wear/mocha-matching-seamless-workout-set-flatlay.jpg',
    created_at: new Date().toISOString()
  },

  // 4. Boxing Gloves & Fight Gear
  {
    id: 'prod-box-1',
    name: 'Pro Leather Sparring Boxing Gloves',
    category: 'Boxing Gloves & Fight Gear',
    description: '100% full-grain cowhide leather 14oz/16oz sparring gloves with multi-layer latex foam and anatomical thumb lock.',
    image_url: '/images/catalog/boxing-gear/pro-leather-boxing-gloves.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-box-2',
    name: 'Custom Pro Competition Fight Gloves',
    category: 'Boxing Gloves & Fight Gear',
    description: 'Pro fight gloves with lace-up wrist closure, custom metallic piping and high-density impact padding.',
    image_url: '/images/catalog/boxing-gear/competition-boxing-gloves.webp',
    created_at: new Date().toISOString()
  },

  // 5. MMA, BJJ Gis & Rashguards
  {
    id: 'prod-mma-1',
    name: 'Competition BJJ Gi Kimono (450 GSM)',
    category: 'MMA, BJJ Gis & Rashguards',
    description: '450 GSM pearl weave cotton jacket with 10oz ripstop pants, reinforced knee panels and EVA foam lapel.',
    image_url: '/images/catalog/mma-bjj/bjj-gi-kimono-450gsm.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-mma-2',
    name: 'Pro MMA Compression Rashguard',
    category: 'MMA, BJJ Gis & Rashguards',
    description: '85/15 Polyester Spandex 220 GSM rashguard with 6-panel anatomical flatlock stitching and full sublimation graphics.',
    image_url: '/images/catalog/mma-bjj/pro-mma-compression-rashguard.webp',
    created_at: new Date().toISOString()
  },

  // 6. Tracksuits & Warmups
  {
    id: 'prod-track-1',
    name: 'Performance Athletic Tracksuit Set',
    category: 'Tracksuits & Warmups',
    description: 'Full-zip athletic polyester tricot tracksuit jacket and tapered warmup pants with custom piping and ribbed cuffs.',
    image_url: '/images/catalog/tracksuits/mens-athletic-warmup-tracksuit.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-track-2',
    name: 'Tapered Fleece Training Pants',
    category: 'Tracksuits & Warmups',
    description: '320 GSM cotton-poly fleece training pants with elasticated ankle cuffs, drawstring waist and side zip pockets.',
    image_url: '/images/catalog/tracksuits/tapered-fleece-training-pants.webp',
    created_at: new Date().toISOString()
  },

  // 7. Sublimated Teamwear & Kits
  {
    id: 'prod-team-1',
    name: 'Sublimated Soccer Team Uniform Kit',
    category: 'Sublimated Teamwear & Kits',
    description: '150 GSM moisture-wicking bird-eye poly mesh soccer jersey and athletic shorts with Italian sublimation inks.',
    image_url: '/images/categories/1780941233_soccer-jersey.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-team-2',
    name: 'Pro Mesh Basketball Uniform Kit',
    category: 'Sublimated Teamwear & Kits',
    description: 'Reversible moisture-wicking interlock mesh basketball jersey and shorts with custom team numbers and names.',
    image_url: '/images/original-generated/category-basketball-uniform.webp',
    created_at: new Date().toISOString()
  },

  // 8. Compression & Baselayers
  {
    id: 'prod-comp-1',
    name: '4-Way Stretch Compression Baselayer Set',
    category: 'Compression & Baselayers',
    description: '240 GSM warp-knit compression top and tights with graduated muscle support and flatlock anti-chafing seams.',
    image_url: '/images/catalog/fitness-wear/black-mens-compression-baselayer-set-flatlay.jpg',
    created_at: new Date().toISOString()
  },

  // 9. Custom Denim & Jeans
  {
    id: 'prod-denim-1',
    name: 'Raw Selvedge Denim Jeans & Jackets',
    category: 'Custom Denim & Jeans',
    description: '13.5oz ring-spun raw cotton selvedge denim with copper hardware, chainstitched hems and custom leather back patch.',
    image_url: '/images/catalog/denim-jeans/raw-denim-jeans-stack.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-denim-2',
    name: 'Classic Vintage Washed Tapered Denim',
    category: 'Custom Denim & Jeans',
    description: '12oz comfort stretch denim with authentic stone wash, whiskering, custom embossed rivets and YKK zipper fly.',
    image_url: '/images/catalog/denim-jeans/vintage-washed-tapered-denim.webp',
    created_at: new Date().toISOString()
  },

  // 10. Private Label Trims & Packaging
  {
    id: 'prod-trim-1',
    name: 'Custom Damask Neck Labels & Hangtags',
    category: 'Private Label Trims & Packaging',
    description: '50D high-density damask woven neck labels, satin care labels and 400 GSM foil-stamped coated retail hangtags.',
    image_url: '/images/catalog/factory-production/private-label-packaging-tags.webp',
    created_at: new Date().toISOString()
  },
  {
    id: 'prod-trim-2',
    name: 'Custom Frosted EVA Zipper Polybags',
    category: 'Private Label Trims & Packaging',
    description: 'Eco-friendly frosted EVA zipper packaging bags with custom logo print, ventilation holes and Amazon FBA barcodes.',
    image_url: '/images/catalog/factory-production/frosted-eva-zipper-polybag.webp',
    created_at: new Date().toISOString()
  }
];

// GET /api/products -> Fetch all products or filter by category
export async function GET(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({
      success: true,
      count: DEFAULT_PRODUCTS.length,
      data: DEFAULT_PRODUCTS
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase fetch products error:', error);
      return NextResponse.json(
        { error: error.message, data: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      data: data || []
    });
  } catch (err: any) {
    console.error('API /api/products GET error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/products -> Add a new product to the catalog
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, description, image_url } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: 'Name and category are required fields.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: name.trim(),
          category: category.trim(),
          description: description ? description.trim() : null,
          image_url: image_url ? image_url.trim() : '/images/products/1780565647_slim-fit-gym-joggers.webp'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert product error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully',
        data: data?.[0]
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API /api/products POST error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

