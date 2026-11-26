"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface SlideItem {
  id?: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  alt?: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  { image_url: '/images/site/hero-slide-factory-craft.webp', alt: 'Private label activewear manufacturing facility Sialkot' },
  { image_url: '/images/site/hero-slide-streetwear-hoodies.webp', alt: 'Custom streetwear and heavyweight hoodies manufacturer' },
  { image_url: '/images/site/hero-slide-athletic-tracksuits.webp', alt: 'Athletic tracksuits and performance gym wear production' },
  { image_url: '/images/site/hero-slide-boxing-combat-gear.webp', alt: 'Custom boxing gear and combat fight kits manufacturing' }
];

interface HeroSliderProps {
  slides?: SlideItem[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <section className="home-hero" aria-label="Private label activewear manufacturing">
      <div className="home-hero-slides" aria-hidden="true">
        {activeSlides.map((slide, idx) => {
          // On SSR and initial paint, only load slide 0 to prevent blocking mobile bandwidth with 5 heavy background images
          const shouldLoad = idx === 0 || mounted;
          const bgUrl = slide.image_url;
          return (
            <div
              key={slide.id || slide.image_url || idx}
              className={`home-hero-slide ${idx === currentIndex ? 'is-active' : ''}`}
              style={{ backgroundImage: shouldLoad ? `url('${bgUrl}')` : 'none' }}
            >
              {idx === 0 && (
                <img
                  src={bgUrl}
                  alt={slide.alt || "Private label activewear manufacturing facility Sialkot"}
                  fetchPriority="high"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="container">
        <div className="home-hero-content">
          <span className="home-kicker">Private label manufacturing in Sialkot, Pakistan</span>
          <h1>Private Label Activewear Manufacturer for Custom Fitness and Gym Wear</h1>
          <p className="home-hero-copy">
            Build premium custom activewear with a low MOQ private label manufacturer in Sialkot, Pakistan. We help startups and growing fitness brands with sampling, custom branding, performance fabrics and worldwide shipping.
          </p>
          <div className="home-hero-actions">
            <Link href="/contact-us" className="btn btn-primary">
              Request a Manufacturing Quote
            </Link>
            <Link href="/manufacturing-process" className="btn btn-outline">
              View Manufacturing Capabilities
            </Link>
          </div>
          <p className="hero-cta-microcopy">
            Get practical MOQ guidance, sampling support and a production plan matched to your first or next collection.
          </p>
          <ul className="home-hero-points" aria-label="Key manufacturing benefits">
            <li>Typical MOQ from 50 pieces</li>
            <li>Samples before bulk production</li>
            <li>Custom labels and packaging</li>
            <li>Worldwide shipping support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
