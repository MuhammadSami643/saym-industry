"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SLIDES = [
  '/images/site/1776603661_home-hero-slider-image-1.webp',
  '/images/site/1776603662_home-hero-slider-image-2.webp',
  '/images/site/1776603680_home-hero-slider-image-3.webp',
  '/images/site/1776603680_home-hero-slider-image-4.webp',
  '/images/site/1776603680_home-hero-slider-image-5.webp'
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="home-hero" aria-label="Private label activewear manufacturing">
      <div className="home-hero-slides" aria-hidden="true">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide}
            className={`home-hero-slide ${idx === currentIndex ? 'is-active' : ''}`}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>
      <div className="container">
        <div className="home-hero-content">
          <span className="home-kicker">Private label manufacturing in Sialkot, Pakistan</span>
          <h1>Private Label Activewear Manufacturer for Custom Fitness and Gym Wear</h1>
          <p className="home-hero-copy">
            Build premium custom activewear with a low MOQ private label manufacturer in Sialkot, Pakistan. We help startups and growing fitness brands with sampling, custom branding, performance fabrics and worldwide shipping.
          </p>
          <div className="home-hero-actions">
            <Link href="/contact" className="btn btn-primary">
              Request a Manufacturing Quote
            </Link>
            <Link href="/manufacturing" className="btn btn-outline">
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

