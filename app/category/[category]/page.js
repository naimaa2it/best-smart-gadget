// app/category/[category]/page.jsx
import DynamicPage from "@/page/DynamicPage";
import productsData from "@/data/products.json";

export async function generateStaticParams() {
  // Define the exact category slugs that exist in your data
  const validCategories = [
    { category: "drones" },
    { category: "smartwatches" },
    { category: "soundbars" },
    { category: "drills" },
    { category: "earbuds" }
  ];
  
  return validCategories;
}

export async function generateMetadata({ params }) {
  // Await params for Next.js 15
  const awaitedParams = await params;
  const { category } = awaitedParams;
  
  // Map URL slugs to data category keys
  const categorySlugMap = {
    'drones': 'drones',
    'smartwatches': 'smartwatches',
    'soundbars': 'soundbars',
    'drills': 'drills',
    'earbuds': 'earbuds'
  };
  
  const dataCategory = categorySlugMap[category];
  const categoryData = productsData.categories[dataCategory];

  if (!categoryData) {
    return {
      title: "Category Not Found | Best Gear Buy",
      description: "The category you're looking for doesn't exist."
    };
  }

  const currentYear = new Date().getFullYear();
  const productCount = categoryData.products?.length || 0;

  return {
    title: `${categoryData.name} ${currentYear} | Best Gear Buy - Expert Reviews & Buying Guide`,
    description: `${categoryData.description} Compare ${productCount}+ products with expert reviews, ratings, and buying guides.`,
    keywords: `${categoryData.name}, ${category}, reviews, buying guide, best ${category} ${currentYear}, product comparison`,
    openGraph: {
      title: `${categoryData.name} ${currentYear}`,
      description: categoryData.description,
      type: 'website',
      images: categoryData.image ? [{ url: categoryData.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryData.name} ${currentYear}`,
      description: categoryData.description,
    },
    alternates: {
      canonical: `https://bestgearbuy.com/category/${category}`,
    },
  };
}

export default function Page({ params }) {
  return <DynamicPage />;
}