// app/category/[category]/s/[subcategory]/page.js
import DynamicPage from "@/page/DynamicPage";
import productsData from "@/data/products.json";

export async function generateStaticParams() {
  const paths = [];

  // Loop through all categories and their subcategories
  for (const [categoryKey, categoryData] of Object.entries(productsData.categories)) {
    if (categoryData.subcategories && Array.isArray(categoryData.subcategories)) {
      categoryData.subcategories.forEach((subcategory) => {
        paths.push({
          category: categoryKey.toLowerCase(),
          subcategory: subcategory.toLowerCase().replace(/\s+/g, "-"),
        });
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { category, subcategory } = awaitedParams;

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

  // Convert URL subcategory slug back to display name
  const subcategoryName = subcategory.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  // Find matching subcategory in the data (case insensitive)
  const matchingSubcategory = categoryData.subcategories?.find(
    sub => sub.toLowerCase() === subcategoryName.toLowerCase()
  );

  const displaySubcategory = matchingSubcategory || subcategoryName;

  return {
    title: `Best ${displaySubcategory} ${new Date().getFullYear()} | ${categoryData.name}`,
    description: `Discover the best ${displaySubcategory.toLowerCase()} in ${new Date().getFullYear()}. Expert reviews, comparisons, and buying guides for ${displaySubcategory.toLowerCase()}.`,
    keywords: `${displaySubcategory}, ${categoryData.name}, reviews, buying guide, best ${displaySubcategory.toLowerCase()}`,
    openGraph: {
      title: `Best ${displaySubcategory} ${new Date().getFullYear()}`,
      description: `Expert reviews and buying guides for ${displaySubcategory.toLowerCase()}`,
      type: 'website',
    },
  };
}

export default function Page({ params }) {
  return <DynamicPage />;
}
