// app/privacy-policy/page.tsx
import PrivacyPolicy from "@/page/PrivacyPolicy";
import React from "react";

// ✅ SEO metadata for Privacy Policy page
export const metadata = {
  title: "Privacy Policy | SmartGadget",
  description:
    "Read SmartGadget's Privacy Policy to understand how we collect, use, and protect your information when you browse drones, smartwatches, soundbars, drills, and earbuds content.",
  openGraph: {
    title: "Privacy Policy | SmartGadget",
    description:
      "Learn how SmartGadget protects your privacy and handles your data in compliance with global standards.",
    url: "https://bestgearbuy.com/privacy-policy",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://bestgearbuy.com/privacy-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Privacy Policy - SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | SmartGadget",
    description:
      "Understand SmartGadget’s data collection and usage practices by reading our Privacy Policy.",
    images: ["https://bestgearbuy.com/privacy-og.jpg"],
  },
  alternates: {
    canonical: "https://bestgearbuy.com/privacy-policy",
  },
};

const Page = () => {
  return <PrivacyPolicy />;
};

export default Page;
