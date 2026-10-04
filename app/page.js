// app/page.tsx
import HeroSection from "@/components/home-component/hero-section";
import CategoryGrid from "@/components/home-component/CategoryGrid";
import ServicesBanner from "@/components/home-component/ServicesSlider";
import ReviewCarousel from "@/components/home-component/Reviews";
import FeaturedProducts from "@/components/home-component/FeaturedProducts";

// ✅ Metadata for SEO
export const metadata = {
  title: "Best Drones, Smartwatches, Soundbars, Drills & Earbuds | SmartGadget",
  description:
    "Discover top-rated Drones, Smart Watches, Soundbars, Cordless Drills, and Earbuds. Explore reviews, deals, and buying guides for affordable and premium gadgets.",
  keywords: [
    "Drones",
    "Affordable Drone",
    "Camera Drone",
    "Smartwatches",
    "Apple Smartwatch",
    "Soundbars",
    "Cordless Drills",
    "Power Tools",
    "Earbuds",
    "Wireless Earbuds",
    "Tech Reviews",
    "Best Gadgets",
  ],
  openGraph: {
    title: "SmartGadget - Best Gadgets & Reviews",
    description:
      "Shop the best Drones, Smart Watches, Soundbars, Cordless Drills, and Earbuds with detailed reviews and buying guides.",
    url: "https://bestgearbuy.com",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://bestgearbuy.com/og-image.jpg", // 🔄 Replace with your image
        width: 1200,
        height: 630,
        alt: "SmartGadget - Best Gadgets Online",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartGadget - Best Gadgets & Reviews",
    description:
      "Explore drones, smartwatches, soundbars, drills, and earbuds with reviews & deals.",
    images: ["https://bestgearbuy.com/og-image.jpg"], // 🔄 Replace with real image
  },
  alternates: {
    canonical: "https://bestgearbuy.com",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <ServicesBanner />
      <FeaturedProducts />
      <ReviewCarousel />
    </>
  );
}
