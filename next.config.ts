import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: '/hoodies', destination: '/hoodies-manufacturer-pakistan' },
      { source: '/custom-hoodies', destination: '/hoodies-manufacturer-pakistan' },
      { source: '/streetwear', destination: '/streetwear-manufacturer-pakistan' },
      { source: '/jeans', destination: '/jeans-manufacturer-pakistan' },
      { source: '/denim', destination: '/jeans-manufacturer-pakistan' },
      { source: '/custom-jeans', destination: '/jeans-manufacturer-pakistan' },
      { source: '/boxing-gear', destination: '/boxing-gear-manufacturer-bulk' },
      { source: '/boxing-wear', destination: '/boxing-wear-manufacturer-pakistan' },
      { source: '/combat-gear', destination: '/boxing-gear-manufacturer-bulk' },
      { source: '/fitness-wear', destination: '/fitness-wear-manufacturer' },
      { source: '/activewear', destination: '/fitness-wear-manufacturer' },
      { source: '/sportswear', destination: '/sportswear-manufacturer-pakistan' },
      { source: '/tracksuits', destination: '/sportswear-manufacturer-pakistan' },
      { source: '/low-moq-activewear-manufacturer', destination: '/private-label' },
      { source: '/activewear-manufacturer-for-startups', destination: '/private-label' },
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
      { source: '/activewear-manufacturer-sialkot', destination: '/fitness-wear-manufacturer-sialkot' },
      { source: '/leggings-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/sports-bra-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/yoga-wear-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/wholesale-activewear-suppliers-uk', destination: '/private-label' },
      { source: '/wholesale-activewear-suppliers-usa', destination: '/private-label' },
      { source: '/wholesale-fitness-apparel-suppliers-europe', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-europe', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-uk', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-usa', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-germany', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-france', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-netherlands', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-italy', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-spain', destination: '/private-label' },
      { source: '/private-label-activewear-manufacturer-australia', destination: '/private-label' },

      // High-Converting Sialkot Export Niche Rewrites:
      // 1. Martial Arts & MMA Combat Gear
      { source: '/martial-arts-gear-manufacturer-pakistan', destination: '/boxing-gear-manufacturer-bulk' },
      { source: '/bjj-gi-manufacturer-pakistan', destination: '/boxing-wear-manufacturer-pakistan' },
      { source: '/custom-rashguard-manufacturer', destination: '/boxing-wear-manufacturer-pakistan' },
      { source: '/mma-shorts-manufacturer', destination: '/boxing-gear-manufacturer-bulk' },

      // 2. Custom Tracksuits & Warmups
      { source: '/tracksuits-manufacturer-pakistan', destination: '/sportswear-manufacturer-pakistan' },
      { source: '/custom-tracksuits', destination: '/sportswear-manufacturer-pakistan' },
      { source: '/fleece-tracksuits-manufacturer', destination: '/sportswear-manufacturer-pakistan' },
      { source: '/poly-tricot-warmup-manufacturer', destination: '/sportswear-manufacturer-pakistan' },

      // 3. Compression & Baselayers
      { source: '/compression-wear-manufacturer-pakistan', destination: '/fitness-wear-manufacturer' },
      { source: '/custom-compression-tights', destination: '/fitness-wear-manufacturer' },
      { source: '/athletic-baselayers-manufacturer', destination: '/fitness-wear-manufacturer' },

      // 4. Sublimated Team Uniforms & Teamwear
      { source: '/custom-teamwear-manufacturer-pakistan', destination: '/sportswear-manufacturer-exporter' },
      { source: '/sublimated-jerseys-manufacturer', destination: '/sportswear-manufacturer-exporter' },
      { source: '/soccer-uniforms-manufacturer-sialkot', destination: '/sportswear-manufacturer-exporter' },
      { source: '/basketball-uniforms-manufacturer', destination: '/sportswear-manufacturer-exporter' },

      // 5. Custom Jackets & Outerwear
      { source: '/custom-jackets-manufacturer-pakistan', destination: '/streetwear-manufacturer-pakistan' },
      { source: '/varsity-jackets-manufacturer-sialkot', destination: '/streetwear-manufacturer-pakistan' },
      { source: '/puffer-jackets-manufacturer-bulk', destination: '/streetwear-manufacturer-pakistan' },
      { source: '/windbreaker-jackets-manufacturer', destination: '/streetwear-manufacturer-pakistan' },

      { source: '/fitness-wear-manufacturer/joggers/:path*', destination: '/products' },
    ];
  },
};

export default nextConfig;
