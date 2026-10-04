// app/contact/page.tsx
import ContactPage from "@/page/ContactPage";
import React from "react";

// ✅ SEO metadata for Contact page
export const metadata = {
  title: "Contact Us | SmartGadget",
  description:
    "Get in touch with SmartGadget. Have questions about drones, smartwatches, soundbars, cordless drills, or earbuds? Contact us today.",
  openGraph: {
    title: "Contact SmartGadget",
    description:
      "Reach out to SmartGadget for inquiries, support, or collaboration related to drones, smartwatches, soundbars, drills, and earbuds.",
    url: "https://bestgearbuy.com/contact",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://bestgearbuy.com/contact-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Contact SmartGadget",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | SmartGadget",
    description:
      "Have questions or feedback? Get in touch with SmartGadget today.",
    images: ["https://bestgearbuy.com/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://bestgearbuy.com/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
