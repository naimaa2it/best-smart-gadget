// app/amazon-affiliate-advertiser-disclosure/page.tsx
import AmazonAffiliateAdvertiserDisclosure from "@/page/AmazonAffiliateAdvertiserDisclosure";
import React from "react";

// ✅ SEO metadata for Affiliate Disclosure page
export const metadata = {
  title: "Amazon Affiliate Disclosure | SmartGadget",
  description:
    "SmartGadget participates in the Amazon Services LLC Associates Program. Learn more about our affiliate disclosure and how we earn commissions.",
  openGraph: {
    title: "Amazon Affiliate Disclosure | SmartGadget",
    description:
      "Transparency matters. Read our Amazon Affiliate Disclosure to understand how SmartGadget earns commissions from qualifying purchases.",
    url: "https://bestgearbuy.com/amazon-affiliate-advertiser-disclosure",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://bestgearbuy.com/affiliate-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Amazon Affiliate Disclosure - SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Affiliate Disclosure | SmartGadget",
    description:
      "SmartGadget is part of the Amazon Associates Program. Learn about our affiliate disclosure and commissions policy.",
    images: ["https://bestgearbuy.com/affiliate-og.jpg"],
  },
  alternates: {
    canonical: "https://bestgearbuy.com/amazon-affiliate-advertiser-disclosure",
  },
};

export default function Page() {
  return <AmazonAffiliateAdvertiserDisclosure />;
}
