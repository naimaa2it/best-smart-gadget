// app/about/page.tsx
import AboutPage from "@/page/AboutPage";
import React from "react";

// ✅ SEO metadata for About page
export const metadata = {
  title: "About Us | SmartGadget",
  description:
    "Learn more about SmartGadget, your trusted source for reviews and guides on drones, smartwatches, soundbars, cordless drills, and earbuds.",
  openGraph: {
    title: "About SmartGadget",
    description:
      "Discover our mission to provide honest reviews and buying guides for drones, smartwatches, soundbars, drills, and earbuds.",
    url: "https://bestgearbuy.com/about",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://bestgearbuy.com/about-og.jpg", // 🔄 replace with real image
        width: 1200,
        height: 630,
        alt: "About SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SmartGadget",
    description:
      "Get to know SmartGadget — we provide honest reviews and buying guides for gadgets and tech products.",
    images: ["https://bestgearbuy.com/about-og.jpg"], // 🔄 replace
  },
  alternates: {
    canonical: "https://bestgearbuy.com/about",
  },
};

const Page = () => {
  return <AboutPage />;
};

export default Page;
