"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import productsData from "@/data/products.json";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Shield,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { category, id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category || !id) return;

    // Simulate API loading
    setTimeout(() => {
      const formattedCategory = decodeURIComponent(category).replace(/-/g, " ");
      const productId = parseInt(id);

      // Find product in the specific category
      const categoryData = productsData.categories[formattedCategory];
      if (categoryData?.products) {
        const foundProduct = categoryData.products.find(
          (p) => p.id === productId
        );

        if (foundProduct) {
          setProduct({ ...foundProduct, category: formattedCategory });

          // Find related products (same category, different products)
          const related = categoryData.products
            .filter((p) => p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }

      setLoading(false);
    }, 500);
  }, [category, id]);

  const changeImage = (direction) => {
    if (!product?.images) return;

    const totalImages = product.images.length;
    if (totalImages === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (selectedImageIndex + 1) % totalImages;
    } else {
      newIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    }
    setSelectedImageIndex(newIndex);
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[selectedImageIndex]
      : product.image;

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || "Product",
    image: product.image || "",
    description: product.description || "Product description",
    brand: product.brand ? {
      "@type": "Brand",
      name: product.brand,
    } : undefined,
    offers: {
      "@type": "Offer",
      url: `https://bestgearbuy.com/category/${category}/${id}`,
      priceCurrency: "USD",
      price: product.price || 0,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Best Gear Buy",
      },
    },
    aggregateRating: product.rating && product.reviews ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 10,
      worstRating: 1,
    } : undefined,
    review: product.userReviews && Array.isArray(product.userReviews) ? product.userReviews.slice(0, 5).map(review => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.username || "Anonymous",
      },
      datePublished: review.date || new Date().toISOString().split('T')[0],
      reviewRating: review.rating ? {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 10,
        worstRating: 1,
      } : undefined,
      reviewBody: review.text || review.review || "",
    })).filter(review => review.reviewBody) : undefined,
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link
                href={`/category/${product.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-purple-600 transition-colors duration-300"
              >
                {product.category}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">
                {product.name.length > 50
                  ? product.name.substring(0, 50) + "..."
                  : product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="relative aspect-square mb-4">
              <img
                src={mainImage || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => changeImage("prev")}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-purple-100 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => changeImage("next")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-cyan-100 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-lg">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-purple-600 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {product.brand}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4 flex-wrap">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900 mr-2">
                  {product.rating?.toFixed(1)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => window.open(product.alibabaUrl, "_blank")}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  product.inStock
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Check Price on Amazon" : "Out of Stock"}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-cyan-500" />
                  <span>1-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Amazon Badge */}
            <div className="text-center border-t border-gray-200 pt-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="h-6 mx-auto mb-2"
              />
              <span className="text-xs text-gray-500">
                Prime Delivery Available
              </span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-12 border border-gray-100">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-6 sm:space-x-8 px-4 sm:px-6">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
                { id: "summary", label: "Review Summary" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-purple-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                {product.features && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-100"
                  >
                    <span className="font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && product.userReviews && (
              <div className="space-y-6">
                {product.userReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex flex-wrap items-center justify-between mb-3">
                      <div className="flex items-center flex-wrap gap-2">
                        <div className="flex items-center mr-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-gray-900">
                          {review.username}
                        </span>
                        {review.verified && (
                          <span className="bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      {review.title}
                    </h5>
                    <p className="text-gray-700 leading-relaxed">
                      {review.review || review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Review Summary Tab */}
            {activeTab === "summary" && product.reviewSummary && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Overview</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {product.reviewSummary.overview ||
                      product.reviewSummary.verdict}
                  </p>
                </div>

                {product.reviewSummary.pros && (
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {product.reviewSummary.pros.map((pro, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.reviewSummary.cons && (
                  <div>
                    <h4 className="font-semibold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {product.reviewSummary.cons.map((con, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.reviewSummary.verdict && (
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-6 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Final Verdict
                    </h4>
                    <p className="text-purple-800 leading-relaxed">
                      {product.reviewSummary.verdict}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/category/${product.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
              >
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {relatedProduct.name.length > 60
                        ? relatedProduct.name.substring(0, 60) + "..."
                        : relatedProduct.name}
                    </h3>

                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        router.push(
                          `/category/${product.category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/${relatedProduct.id}`
                        )
                      }
                      className="w-full mt-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-2 px-4 rounded text-sm font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
