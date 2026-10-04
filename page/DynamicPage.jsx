"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import productsData from "@/data/products.json";
import { useRouter } from "next/navigation";
import {
  Grid,
  List,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import Link from "next/link";
import CategoryPopup from "@/components/CouponPopup";

export default function DynamicPage() {
  const router = useRouter();
  const params = useParams();
  const { category, subcategory } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("reviews");
  const [viewMode, setViewMode] = useState("list");
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTitle, setPageTitle] = useState("2025 Best Products");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  // NEW: error state to show friendly error UI
  const [error, setError] = useState(null);

  const isMounted = useRef(true);

  const PRODUCTS_PER_PAGE = 4;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!category) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedCategory = decodeURIComponent(category).replace(/-/g, " ");
        setSelectedCategory(formattedCategory);
        
        // Handle subcategory from URL
        let formattedSubcategory = "";
        if (subcategory) {
          formattedSubcategory = decodeURIComponent(subcategory).replace(/-/g, " ");
          // Capitalize each word
          formattedSubcategory = formattedSubcategory.replace(/\b\w/g, l => l.toUpperCase());
        }
        
        setSelectedSubcategory(formattedSubcategory);
        setPageTitle(formattedSubcategory ? `2025 Best ${formattedSubcategory}` : `2025 Best ${formattedCategory}`);

        // simulate API loading (but safely)
        await new Promise((res) => setTimeout(res, 500));
        // Access the category data correctly from the nested structure
        const catData = productsData?.categories?.[formattedCategory];

        if (catData?.products && Array.isArray(catData.products)) {
          if (!isMounted.current) return;

          setProducts(catData.products);
          setFilteredProducts(catData.products);

          const initialSelected = {};
          catData.products.forEach((product) => {
            initialSelected[product.id] = 0;
          });
          setSelectedImages(initialSelected);
        } else {
          // If no products found, set empty arrays and show friendly info
          if (!isMounted.current) return;
          setProducts([]);
          setFilteredProducts([]);
          setSelectedImages({});
          // set an expected-not-found "404-like" message
          setError(
            `No products found for category "${formattedCategory}". It may be a wrong URL or the category has no products yet.`
          );
        }
      } catch (err) {
        console.error("Error loading category data:", err);
        if (!isMounted.current) return;
        setError("Something went wrong while loading this category.");
        setProducts([]);
        setFilteredProducts([]);
        setSelectedImages({});
      } finally {
        if (!isMounted.current) return;
        setLoading(false);
      }
    })();
  }, [category, subcategory]);

  useEffect(() => {
    try {
      let filtered = products || [];

      // Filter by price range
      filtered = filtered.filter(
        (product) =>
          (product?.price || 0) >= priceRange[0] &&
          (product?.price || 0) <= priceRange[1]
      );

      // Filter by subcategory if selected
      if (selectedSubcategory) {
        filtered = filtered.filter(
          (product) => product?.category === selectedSubcategory
        );
      }

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (a?.price || 0) - (b?.price || 0);
          case "price-high":
            return (b?.price || 0) - (a?.price || 0);
          case "rating-high":
            return (b?.rating || 0) - (a?.rating || 0);
          case "popularity":
            return (b?.reviews || 0) - (a?.reviews || 0);
          case "category":
            return (a?.category || "").localeCompare(b?.category || "");
          default:
            // default: keep original logic but avoid undefined
            return (b?.reviews || 0) - (a?.rating || 0);
        }
      });

      setFilteredProducts(filtered);
      // Ensure current page resets to 1 on new filters
      setCurrentPage(1);
      // ensure currentPage stays within bounds if filtered list shorter
      // (handled in pagination useEffect below)
    } catch (err) {
      console.error("Error applying filters:", err);
      setFilteredProducts([]);
    }
  }, [products, priceRange, sortBy, selectedSubcategory]);

  // Keep currentPage within bounds if filteredProducts changes
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    if (!category || popupShown) return;

    // Small delay to ensure page is loaded
    const timer = setTimeout(() => {
      setShowPopup(true);
      setPopupShown(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [category, popupShown]);

  useEffect(() => {
    setPopupShown(false);
  }, [category]);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleSubcategorySelect = (subcategoryName) => {
    // Convert subcategory name to URL-friendly slug
    const subcategorySlug = subcategoryName.toLowerCase().replace(/\s+/g, "-");
    
    // Navigate to the subcategory URL
    router.push(`/category/${category}/s/${subcategorySlug}`);
    
    setShowPopup(true);
  };

  const clearSubcategoryFilter = () => {
    // Navigate back to main category page
    router.push(`/category/${category}`);
  };

  const changeProductImage = (productId, direction) => {
    setSelectedImages((prev) => {
      const currentIndex = prev[productId] || 0;
      const product = products.find((p) => p?.id === productId);
      if (!product?.images) return prev;

      const totalImages = product.images.length || 0;
      if (totalImages === 0) return prev;

      let newIndex;
      if (direction === "next") {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }

      return {
        ...prev,
        [productId]: newIndex,
      };
    });
  };

  const selectImage = (productId, index) => {
    setSelectedImages((prev) => ({
      ...prev,
      [productId]: index,
    }));
  };

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = (filteredProducts || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil((filteredProducts?.length || 0) / PRODUCTS_PER_PAGE) || 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const truncateTitle = (title, maxLength = 80) => {
    if (!title) return "Untitled Product";
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  const getKeySpecifications = (product) => {
    const specs = [];

    if (product?.specifications) {
      // Try to get meaningful specifications based on product type
      const specKeys = Object.keys(product.specifications);
      const importantKeys = specKeys
        .filter(
          (key) =>
            !key.toLowerCase().includes("asin") &&
            !key.toLowerCase().includes("model") &&
            !key.toLowerCase().includes("manufacturer") &&
            !key.toLowerCase().includes("warranty") &&
            !key.toLowerCase().includes("upc")
        )
        .slice(0, 5);

      importantKeys.forEach((key) => {
        if (product.specifications[key]) {
          specs.push(`${key}: ${product.specifications[key]}`);
        }
      });
    }

    // Fallback to features if no good specifications found
    if (specs.length < 3 && product?.features && product.features.length > 0) {
      const additionalSpecs = product.features.slice(0, 5 - specs.length);
      specs.push(
        ...additionalSpecs.map((feature) => feature.replace(/^[•\-\s]*/, ""))
      );
    }

    return specs.slice(0, 3);
  };

  // Get current category data
  const currentCategoryData = productsData?.categories?.[selectedCategory] || {};
  const subcategories = currentCategoryData?.subcategories || [];

  // Image fallback handler
  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder-image.jpg";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Show error message (404-like or other) but keep UI consistent
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  // safe router navigation back to category root
                  try {
                    router?.push && router.push("/category");
                  } catch (err) {
                    console.error("Navigation failed:", err);
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg"
              >
                Browse Categories
              </button>
              <button
                onClick={() => {
                  // reload page safely
                  try {
                    if (typeof window !== "undefined") window.location.reload();
                  } catch (err) {
                    console.error("Reload failed:", err);
                  }
                }}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-600">
            {pageTitle}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect products for your needs. Explore our curated
            selection of high-quality items.
          </p>

          {/* Subcategory Filter Indicator */}
          {selectedSubcategory && (
            <div className="mt-4 flex items-center justify-center">
              <span className="bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                Filtered by: {selectedSubcategory}
              </span>
              <button
                onClick={clearSubcategoryFilter}
                className="ml-3 text-purple-600 hover:text-purple-800 font-bold bg-white/80 rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="lg:flex lg:space-x-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Filters and Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseInt(e.target.value) || 0])
                    }
                    className="w-full h-2 bg-gradient-to-r from-purple-200 to-cyan-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-600 [&::-webkit-slider-thumb]:to-cyan-600"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="rating-high">Rating</option>
                    <option value="popularity">Popularity</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                {/* View Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View
                  </label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-white text-purple-600 shadow-sm"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-white text-cyan-600 shadow-sm"
                          : "text-gray-600 hover:text-cyan-600"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Responsive Category Dropdown (Mobile Only) */}
                <div className="block lg:hidden mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Category
                  </label>
                  <select
                    value={selectedSubcategory || ""}
                    onChange={(e) =>
                      e.target.value
                        ? handleSubcategorySelect(e.target.value)
                        : clearSubcategoryFilter()
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">All {selectedCategory}</option>
                    {subcategories.length > 0 &&
                      subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Showing {filteredProducts.length === 0 ? 0 : indexOfFirstProduct + 1}-
                    {filteredProducts.length === 0
                      ? 0
                      : Math.min(indexOfLastProduct, filteredProducts.length)}{" "}
                    of {filteredProducts.length} products
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product) => {
                const currentImageIndex = selectedImages[product?.id] || 0;
                const mainImage =
                  product?.images && product.images.length > 0
                    ? product.images[currentImageIndex]
                    : product?.image;

                const discountPercentage =
                  (product?.originalPrice || 0) > (product?.price || 0)
                    ? Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )
                    : 0;

                const specifications = getKeySpecifications(product || {});

                return (
                  <div
                    key={product?.id || Math.random()}
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-300 ${
                      viewMode === "list" ? "flex flex-col md:flex-row" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div
                      className={`relative ${
                        viewMode === "list" ? "w-full md:w-1/3" : "w-full"
                      }`}
                    >
                      <div className="relative h-56 sm:h-64 md:h-56 lg:h-54 overflow-hidden">
                        <img
                          src={mainImage || "/placeholder-image.jpg"}
                          alt={product?.name || "Product image"}
                          onError={handleImgError}
                          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105 p-1 bg-white"
                        />

                        {discountPercentage > 0 && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg">
                            Save {discountPercentage}%
                          </div>
                        )}

                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product?.bestseller && (
                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
                              Bestseller
                            </span>
                          )}
                          {product && !product.inStock && (
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        {product?.images && product.images.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                changeProductImage(product.id, "prev");
                              }}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-purple-100 p-2 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                            >
                              <ChevronLeft className="h-4 w-4 text-gray-700" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                changeProductImage(product.id, "next");
                              }}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-cyan-100 p-2 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                            >
                              <ChevronRight className="h-4 w-4 text-gray-700" />
                            </button>
                          </>
                        )}
                      </div>

                      {product?.images && product.images.length > 1 && (
                        <div className="flex space-x-2 px-2 py-2 overflow-x-auto scrollbar-hide justify-center">
                          {product.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => selectImage(product.id, index)}
                              className={`flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                currentImageIndex === index
                                  ? "border-purple-600 shadow-md"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={image || "/placeholder-image.jpg"}
                                alt={`${product?.name || "product"} ${index + 1}`}
                                onError={handleImgError}
                                className="w-full h-full object-contain"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content + Right Side Section */}
                    <div
                      className={`flex-1 flex ${
                        viewMode === "list"
                          ? "flex-col md:flex-row justify-between"
                          : "flex-col"
                      } p-5`}
                    >
                      {/* Left Content */}
                      <div className="flex-1 pr-0 md:pr-4 mb-4 md:mb-0">
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-gray-900 mr-2">
                            {product?.rating?.toFixed?.(1) || "10.0"}
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product?.rating || 5)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            ({product?.reviews || 0} reviews)
                          </span>
                        </div>

                        <h3 className="text-[16px] font-bold text-gray-900 mb-3">
                          {truncateTitle(product?.name)}
                        </h3>

                        <div className="mb-2">
                          <ul className="text-sm text-gray-700">
                            {specifications.map((spec, index) => (
                              <li key={index}>• {spec}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              try {
                                const safeCategory =
                                  selectedCategory?.toLowerCase?.().replace(/\s+/g, '-') || "";
                                if (router?.push && product?.id) {
                                  router.push(`/category/${safeCategory}/${product.id}`);
                                }
                              } catch (err) {
                                console.error("Navigation to details failed:", err);
                              }
                            }}
                            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-300"
                          >
                            Read Full Details Specification
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>

                     <div className="w-full md:w-48 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 flex flex-col justify-center items-center text-center mx-auto">
                    {discountPercentage > 0 && (
                      <span className="text-green-600 font-bold mb-3 block">
                        Save {discountPercentage}%
                      </span>
                    )}

                    <button
                      onClick={() => {
                        try {
                          const link = product?.alibabaUrl || product?.buyLink;
                          if (link) {
                            if (typeof window !== "undefined") window.open(link, "_blank");
                          } else {
                            alert("Price link not available for this product.");
                          }
                        } catch (err) {
                          console.error("Open link failed:", err);
                        }
                      }}
                      className="w-full max-w-[180px] bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold py-3 rounded-lg mb-4 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center mx-auto"
                    >
                      Check Price
                    </button>

                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                      alt="Amazon"
                      className="h-6 mb-2 mx-auto"
                      onError={handleImgError}
                    />

                    <span className="text-xs text-gray-500 block text-center">
                      Prime Delivery
                    </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-10">
                <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-wrap justify-center gap-2 sm:gap-0">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium flex items-center gap-1 sm:gap-2 transition-all duration-200 shadow-sm text-sm sm:text-base ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transform hover:scale-105"
                    }`}
                  >
                    <span className="hidden sm:inline">←</span> Prev
                  </button>

                  {getPaginationRange().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && paginate(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        currentPage === page
                          ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg"
                          : page === "..."
                          ? "bg-white text-gray-500 border border-gray-300 cursor-default"
                          : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-300 hover:border-purple-300"
                      }`}
                      disabled={page === "..."}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium flex items-center gap-1 sm:gap-2 transition-all duration-200 shadow-sm text-sm sm:text-base ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transform hover:scale-105"
                    }`}
                  >
                    Next <span className="hidden sm:inline">→</span>
                  </button>
                </nav>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>

          {/* Sidebar - Only show subcategories of current category */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-100">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                  Choose categories
                </h3>

                {/* Main Category */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg mb-3 border border-purple-100">
                    <span className="font-semibold text-purple-700 text-lg">{selectedCategory}</span>
                  </div>

                  {/* Subcategories */}
                  {subcategories.length > 0 ? (
                    <ul className="space-y-2">
                      {subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSubcategorySelect(subcategory)}
                            className={`text-sm w-full text-left py-3 px-4 rounded-lg transition-all duration-300 block group ${
                              selectedSubcategory === subcategory
                                ? "bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 font-medium border border-purple-200 shadow-sm"
                                : "text-gray-600 hover:text-purple-700 hover:bg-purple-50 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center">
                              <span
                                className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                                  selectedSubcategory === subcategory
                                    ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                                    : "bg-gray-300 group-hover:bg-purple-400"
                                }`}
                              ></span>
                              {subcategory}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No subcategories available</p>
                  )}
                </div>

                {/* Clear Filter Button */}
                {selectedSubcategory && (
                  <button
                    onClick={clearSubcategoryFilter}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-all duration-300 text-sm border border-gray-200 hover:border-gray-300"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">How We Rank</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-800 mb-2">Expert Analysis</h4>
                    <p className="text-sm text-gray-600">Our team of experts highlights useful information so you can easily compare products to find the one that's right for you.</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="font-semibold text-gray-800 mb-2">Award-Winning Tech</h4>
                    <p className="text-sm text-gray-600">Our technology analyzes thousands of purchase trends to bring you the top product recommendations.</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Why Trust Our Reviews?</h3>
                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-gray-600 mb-3">2,000+ shoppers have used Buyer's Guide in the last week to help find the best products.</p>
                  <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-300">Learn more about our rankings.</a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Reliable, Safe & Secure</h3>
                <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-sm text-gray-600">Helping millions of users make smarter purchases online.</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center py-3 bg-gray-50 rounded-lg transition-colors duration-300 hover:bg-purple-50">Back to Top</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryPopup
        category={category}
        subcategory={selectedSubcategory}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
