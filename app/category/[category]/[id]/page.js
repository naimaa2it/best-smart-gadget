// app/category/[category]/[id]/page.jsx
import ProductDetailPage from "@/page/ProductDetailPage";
import productsData from "@/data/products.json";

export async function generateStaticParams() {
  const paths = [];

  // Loop through categories and their products
  for (const [slug, categoryData] of Object.entries(productsData.categories)) {
    if (categoryData.products && Array.isArray(categoryData.products)) {
      categoryData.products.forEach((product) => {
        paths.push({
          category: slug.toLowerCase().replace(/\s+/g, "-"),
          id: String(product.id),
        });
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const { category, id } = awaitedParams;
  
  // Map URL slugs to data category keys
  const categorySlugMap = {
    'drones': 'drones',
    'smartwatches': 'smartwatches',
    'soundbars': 'soundbars',
    'drills': 'drills',
    'earbuds': 'earbuds'
  };
  
  const dataCategory = categorySlugMap[category];
  
  if (!dataCategory) {
    return {
      title: "Category Not Found | Best Gear Buy",
      description: "The category you're looking for doesn't exist."
    };
  }
  
  const categoryData = productsData.categories[dataCategory];
  
  if (!categoryData) {
    return {
      title: "Category Not Found | Best Gear Buy",
      description: "The category you're looking for doesn't exist."
    };
  }
  
  const product = categoryData?.products?.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return {
      title: "Product Not Found | Best Gear Buy",
      description: "The product you're looking for doesn't exist."
    };
  }

  const currentYear = new Date().getFullYear();
  const rating = product.rating || 0;
  const reviewCount = product.reviews || 0;
  const price = product.price || 0;
  
  // Safely handle description
  const description = product.description || 'Product details and specifications';
  const shortDescription = description.length > 155 
    ? description.substring(0, 155) + '...' 
    : description;

  return {
    title: `${product.name} Review ${currentYear} | Best Gear Buy`,
    description: `${shortDescription} Read our expert review, compare prices, and see ${reviewCount}+ customer ratings.`,
    keywords: `${product.name}, ${product.brand}, ${product.category}, review, ${category}, price comparison, best ${product.category.toLowerCase()}`,
    openGraph: {
      title: `${product.name} Review`,
      description: product.description,
      type: 'website',
      images: product.image ? [{ url: product.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} Review`,
      description: description.length > 200 ? description.substring(0, 200) : description,
    },
    alternates: {
      canonical: `https://bestgearbuy.com/category/${category}/${id}`,
    },
    // Product metadata for SEO (using other field)
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'USD',
      'product:availability': product.inStock ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.brand,
      'product:rating': rating.toString(),
      'product:rating:count': reviewCount.toString(),
    },
  };
}

export default function Page({ params }) {
  return <ProductDetailPage />;
}