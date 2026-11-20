import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sportswear-manufacturer-pakistan',
        destination: '/sportswear-manufacturer',
        permanent: true,
      },
      {
        source: '/sportswear-manufacturer-exporter',
        destination: '/sportswear-manufacturer',
        permanent: true,
      },
      {
        source: '/boxing-wear-manufacturer-pakistan',
        destination: '/boxing-wear-manufacturer',
        permanent: true,
      },
      {
        source: '/hoodies-manufacturer-pakistan',
        destination: '/hoodies-manufacturer',
        permanent: true,
      },
      {
        source: '/streetwear-manufacturer-pakistan',
        destination: '/streetwear-manufacturer',
        permanent: true,
      },
      {
        source: '/jeans-manufacturer-pakistan',
        destination: '/jeans-manufacturer',
        permanent: true,
      },
      {
        source: '/fitness-wear-manufacturer-sialkot',
        destination: '/fitness-wear-manufacturer',
        permanent: true,
      },
      {
        source: '/get-quote',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/categories', destination: '/products' },
      { source: '/product-catalog', destination: '/products' },
      { source: '/contact-us', destination: '/contact' },
      { source: '/manufacturing-capabilities', destination: '/manufacturing' },
      { source: '/private-label-manufacturing', destination: '/private-label' },
      { source: '/sampling-process', destination: '/manufacturing' },
      { source: '/quality-control', destination: '/manufacturing' },
      { source: '/shipping-export', destination: '/manufacturing' },
      
      // Clean Category Rewrites
      { source: '/hoodies', destination: '/hoodies-manufacturer' },
      { source: '/custom-hoodies', destination: '/hoodies-manufacturer' },
      { source: '/streetwear', destination: '/streetwear-manufacturer' },
      { source: '/jeans', destination: '/jeans-manufacturer' },
      { source: '/denim', destination: '/jeans-manufacturer' },
      { source: '/custom-jeans', destination: '/jeans-manufacturer' },
      { source: '/boxing-gear', destination: '/boxing-gear-manufacturer-bulk' },
      { source: '/boxing-wear', destination: '/boxing-wear-manufacturer' },
      { source: '/combat-gear', destination: '/boxing-gear-manufacturer-bulk' },
      { source: '/fitness-wear', destination: '/fitness-wear-manufacturer' },
      { source: '/activewear', destination: '/fitness-wear-manufacturer' },
      { source: '/sportswear', destination: '/sportswear-manufacturer' },
      { source: '/tracksuits', destination: '/sportswear-manufacturer' },
      { source: '/low-moq-activewear-manufacturer', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer', destination: '/private-label' },
      { source: '/custom-activewear-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/custom-leggings-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/custom-sports-bra-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/private-label-gym-wear-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/private-label-fitness-wear-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/oem-activewear-manufacturer', destination: '/private-label' },
      { source: '/oem-gym-wear-manufacturer', destination: '/private-label' },
      { source: '/white-label-activewear-manufacturer', destination: '/private-label' },
      { source: '/custom-athleisure-manufacturer', destination: '/fitness-wear-manufacturer' },
      { source: '/activewear-manufacturer-for-fitness-influencers', destination: '/private-label' },
      { source: '/activewear-manufacturer-for-gym-owners', destination: '/private-label' },
      { source: '/activewear-manufacturer-for-small-brands', destination: '/private-label' },
      { source: '/sustainable-activewear-manufacturer-pakistan', destination: '/manufacturing' },
      { source: '/gym-wear-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/activewear-manufacturer-sialkot', destination: '/fitness-wear-manufacturer' },
      { source: '/leggings-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/sports-bra-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/yoga-wear-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/wholesale-activewear-suppliers-uk', destination: '/private-label' },
      { source: '/wholesale-activewear-suppliers-usa', destination: '/private-label' },
      { source: '/wholesale-fitness-apparel-suppliers-europe', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-australia', destination: '/private-label' },

      // High-Converting Export Niche Rewrites:
      // 1. Martial Arts & MMA Combat Gear
      { source: '/martial-arts-gear-manufacturer-pakistan', destination: '/mma-gear' },
      { source: '/bjj-gi-manufacturer-pakistan', destination: '/mma-gear' },
      { source: '/custom-rashguard-manufacturer', destination: '/mma-gear' },
      { source: '/mma-shorts-manufacturer', destination: '/mma-gear' },

      // 2. Custom Tracksuits & Warmups
      { source: '/tracksuits-manufacturer-pakistan', destination: '/sportswear-manufacturer' },
      { source: '/custom-tracksuits', destination: '/sportswear-manufacturer' },
      { source: '/fleece-tracksuits-manufacturer', destination: '/sportswear-manufacturer' },
      { source: '/poly-tricot-warmup-manufacturer', destination: '/sportswear-manufacturer' },

      // 3. Compression & Baselayers
      { source: '/compression-wear-manufacturer-pakistan', destination: '/compression-wear' },
      { source: '/custom-compression-tights', destination: '/compression-wear' },
      { source: '/athletic-baselayers-manufacturer', destination: '/compression-wear' },

      // 4. Sublimated Team Uniforms & Teamwear
      { source: '/custom-teamwear-manufacturer-pakistan', destination: '/sportswear-manufacturer' },
      { source: '/sublimated-jerseys-manufacturer', destination: '/sportswear-manufacturer' },
      { source: '/soccer-uniforms-manufacturer-sialkot', destination: '/sportswear-manufacturer' },
      { source: '/basketball-uniforms-manufacturer', destination: '/sportswear-manufacturer' },

      // 5. Custom Jackets & Outerwear
      { source: '/custom-jackets-manufacturer-pakistan', destination: '/streetwear-manufacturer' },
      { source: '/varsity-jackets-manufacturer-sialkot', destination: '/streetwear-manufacturer' },
      { source: '/puffer-jackets-manufacturer-bulk', destination: '/streetwear-manufacturer' },
      { source: '/windbreaker-jackets-manufacturer', destination: '/streetwear-manufacturer' },

      { source: '/fitness-wear-manufacturer/joggers/:path*', destination: '/products' },
    ];
  },
};

export default nextConfig;
