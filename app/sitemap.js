import productsData from "@/data/products.json";

export const dynamic = "force-static";

const baseUrl = "https://bestgearbuy.com";

export default function sitemap() {
  // ✅ Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/advertiser-discloser`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ✅ Dynamic category pages
  const categoryPages = [];
  const subcategoryPages = [];
  const productPages = [];

  // Loop through all categories in products.json
  for (const [categoryKey, categoryData] of Object.entries(productsData.categories)) {
    // Add main category page
    categoryPages.push({
      url: `${baseUrl}/category/${categoryKey.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Add subcategory pages
    if (categoryData.subcategories && Array.isArray(categoryData.subcategories)) {
      categoryData.subcategories.forEach((subcategory) => {
        const subcategorySlug = subcategory.toLowerCase().replace(/\s+/g, "-");
        subcategoryPages.push({
          url: `${baseUrl}/category/${categoryKey.toLowerCase()}/s/${subcategorySlug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }

    // Add product detail pages
    if (categoryData.products && Array.isArray(categoryData.products)) {
      categoryData.products.forEach((product) => {
        productPages.push({
          url: `${baseUrl}/category/${categoryKey.toLowerCase()}/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    }
  }

  // ✅ Combine all pages
  return [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...productPages,
  ];
}
