// components/StructuredData.jsx
export function ProductStructuredData({ product, category }) {
  // Handle both data formats
  const productPrice = product.price || product.price_current || 0;
  const productRating = product.rating || product.stars || 0;
  const productReviews = product.reviews || product.ratings || 0;
  const productDescription = product.description || (product.about && product.about[0]) || product.name || 'Product description';
  
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name || 'Product',
    image: product.images || [product.image],
    description: productDescription,
    sku: product.id ? product.id.toString() : '0',
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Unknown'
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: productRating.toString(),
        bestRating: '10'
      },
      author: {
        '@type': 'Organization',
        name: 'SmartGadget'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: productRating.toString(),
      reviewCount: productReviews.toString()
    },
    offers: {
      '@type': 'Offer',
      url: `https://bestgearbuy.com/category/${category}/${product.id}`,
      priceCurrency: 'USD',
      price: productPrice.toString(),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function CategoryStructuredData({ category, products }) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'ItemList',
    name: `${category.name} - Best Products 2025`,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => {
      const productPrice = product.price || product.price_current || 0;
      const productDescription = product.description || (product.about && product.about[0]) || product.name;
      
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `https://bestgearbuy.com/category/${category.slug}/${product.id}`,
          image: product.images?.[0] || product.image,
          description: productDescription ? productDescription.substring(0, 150) : product.name,
          brand: {
            '@type': 'Brand',
            name: product.brand
          },
          offers: {
            '@type': 'Offer',
            price: productPrice.toString(),
            priceCurrency: 'USD'
          }
        }
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}