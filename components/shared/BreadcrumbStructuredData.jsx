// Add this to your DynamicPage component, right before the return statement

// Generate breadcrumb structured data
const BreadcrumbStructuredData = () => {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bestgearbuy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: selectedCategory,
        item: `https://bestgearbuy.com/category/${category}`,
      },
      ...(selectedSubcategory ? [{
        '@type': 'ListItem',
        position: 3,
        name: selectedSubcategory,
        item: `https://bestgearbuy.com/category/${category}?subcategory=${encodeURIComponent(selectedSubcategory)}`,
      }] : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};

// Generate FAQ structured data for better SEO
const FAQStructuredData = () => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best ${selectedSubcategory || selectedCategory} in 2025?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We've reviewed and tested the top ${selectedSubcategory || selectedCategory} products for 2025. Our expert team evaluates products based on performance, features, price, and customer reviews to bring you the best recommendations.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I choose the right ${selectedSubcategory || selectedCategory}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Consider factors like ${selectedSubcategory ? 'specific features, budget, and intended use' : 'your needs, budget, and the features that matter most to you'}. Our buying guide and product comparisons help you make an informed decision.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are these ${selectedSubcategory || selectedCategory} products regularly updated?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, we regularly update our reviews and recommendations to include the latest products and reflect current market prices and availability.`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
};