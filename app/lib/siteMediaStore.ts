import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  alt?: string;
}

export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  alt?: string;
  tags: string[];
  action_text?: string;
}

export interface FeaturedProduct {
  id: string;
  title: string;
  tag: string;
  description: string;
  image_url: string;
  link: string;
  alt?: string;
  action_text?: string;
}

export interface SiteMediaData {
  hero_slides: HeroSlide[];
  category_cards: CategoryCard[];
  featured_product: FeaturedProduct;
}

export const DEFAULT_SITE_MEDIA: SiteMediaData = {
  hero_slides: [
    {
      id: "slide-1",
      title: "Factory Floor & Craftsmanship",
      subtitle: "State-of-the-art garment manufacturing facility in Sialkot, Pakistan",
      image_url: "/images/site/hero-slide-factory-craft.webp",
      alt: "Private label activewear manufacturing facility Sialkot"
    },
    {
      id: "slide-2",
      title: "Streetwear & Heavyweight Hoodies",
      subtitle: "Cut-and-sew French terry and custom oversized silhouettes",
      image_url: "/images/site/hero-slide-streetwear-hoodies.webp",
      alt: "Custom streetwear and heavyweight hoodies manufacturer"
    },
    {
      id: "slide-3",
      title: "Athletic & Performance Tracksuits",
      subtitle: "Engineered technical fabrics, flatlock stitching and athletic fit",
      image_url: "/images/site/hero-slide-athletic-tracksuits.webp",
      alt: "Athletic tracksuits and performance gym wear production"
    },
    {
      id: "slide-4",
      title: "Boxing & Combat Fight Gear",
      subtitle: "Full-grain genuine leather gloves, headguards and fight apparel",
      image_url: "/images/site/hero-slide-boxing-combat-gear.webp",
      alt: "Custom boxing gear and combat fight kits manufacturing"
    }
  ],
  category_cards: [
    {
      id: "cat-fitness",
      title: "Fitness & Activewear",
      description: "Cut-and-sew fitness apparel development, private labeling and bulk manufacturing for fitness brands.",
      image_url: "/images/categories/1776540259_fitness-wear.webp",
      link: "/fitness-wear",
      alt: "Private label fitness wear manufacturer in Sialkot Pakistan",
      tags: ["75/25 Nylon Spandex", "4-Needle Flatlock", "240 GSM Squat-Proof"],
      action_text: "Explore Fitness Wear"
    },
    {
      id: "cat-sportswear",
      title: "Sports Wear & Teamwear",
      description: "Sublimated team jerseys, club tracksuits and athletic uniforms engineered for professional durability.",
      image_url: "/images/categories/1776540279_sports-wear.webp",
      link: "/sportswear",
      alt: "Custom sportswear manufacturer and wholesale supplier in Sialkot Pakistan",
      tags: ["Italian Sublimation Inks", "Moisture-Wicking Poly", "Reinforced Seams"],
      action_text: "Explore Sports Wear"
    },
    {
      id: "cat-boxing",
      title: "Boxing & Combat Gear",
      description: "Competition sparring gloves, trunks, rashguards and custom fight kits tested for impact resistance.",
      image_url: "/images/categories/1776540301_boxing-wear.webp",
      link: "/boxing-gear",
      alt: "Custom boxing wear and fight gear manufacturer in Sialkot Pakistan",
      tags: ["1.2mm Full-Grain Leather", "Multi-Layer Latex Foam", "Anatomical Thumb Lock"],
      action_text: "Explore Boxing Gear"
    },
    {
      id: "cat-streetwear",
      title: "Streetwear & Hoodies",
      description: "Cut-and-sew heavyweight luxury streetwear, acid wash tees and drop-shoulder hoodies for fashion labels.",
      image_url: "/images/categories/1789894942_streetwear.webp",
      link: "/streetwear",
      alt: "Bin Rasool Enterprises branded oversized hoodie, baggy sweatpants and varsity jacket",
      tags: ["380–500 GSM French Terry", "100% Combed Cotton", "High-Density 3D Puff"],
      action_text: "Explore Streetwear"
    }
  ],
  featured_product: {
    id: "feat-joggers",
    title: "Slim Fit Gym Joggers",
    tag: "Joggers",
    description: "Premium quality slim fit gym joggers manufactured for fitness brands, wholesalers and private label buyers. Available in custom fabrics, colors, branding and bulk production options.",
    image_url: "/images/products/1780565647_slim-fit-gym-joggers.webp",
    link: "/fitness-wear-manufacturer/joggers/slim-fit-gym-joggers",
    alt: "Custom Slim Fit Gym Joggers Manufacturer in Sialkot Bulk Order",
    action_text: "View Product Details"
  }
};

const DATA_FILE = path.join(process.cwd(), 'data', 'site_media.json');

export async function getSiteMedia(): Promise<SiteMediaData> {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      hero_slides: Array.isArray(parsed.hero_slides) && parsed.hero_slides.length > 0 ? parsed.hero_slides : DEFAULT_SITE_MEDIA.hero_slides,
      category_cards: Array.isArray(parsed.category_cards) && parsed.category_cards.length > 0 ? parsed.category_cards : DEFAULT_SITE_MEDIA.category_cards,
      featured_product: parsed.featured_product || DEFAULT_SITE_MEDIA.featured_product,
    };
  } catch (err) {
    console.warn('[SiteMediaStore] Could not read site_media.json, using default media', err);
    return DEFAULT_SITE_MEDIA;
  }
}

export async function saveSiteMedia(media: SiteMediaData): Promise<boolean> {
  try {
    await writeFile(DATA_FILE, JSON.stringify(media, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[SiteMediaStore] Error saving site_media.json', err);
    return false;
  }
}
