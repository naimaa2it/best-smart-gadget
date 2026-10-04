"use client";

import { useState, useEffect } from "react";
import { X, Star, ChevronRight, ExternalLink } from "lucide-react";
import couponData from "@/data/couponData.json";

export default function CategoryPopup({ category, subcategory, isOpen, onClose }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [animatedDiscount, setAnimatedDiscount] = useState(0);

  // ✅ Animation for discount
  useEffect(() => {
    if (!selectedProduct || !selectedProduct.price || !selectedProduct.originalPrice) return;

    const target = getDiscountPercentage(selectedProduct);
    let start = 0;
    const duration = 1200; // 1.2s smooth animation
    const stepTime = Math.max(16, duration / target);

    const animate = () => {
      start += 1;
      if (start <= target) {
        setAnimatedDiscount(start);
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [selectedProduct]);

  // ✅ Function for discount % calc
  const getDiscountPercentage = (product) => {
    if (!product || !product.price || !product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  // ✅ Filter & load products
  useEffect(() => {
    if (!category || !isOpen) return;

    let filteredProducts = couponData || [];
    const categoryMap = {
      drones: [
        "Drones",
        "Affordable Drone",
        "Budget Drone",
        "Cheap Drone",
        "Camera Drone",
        "Beginner Drone",
        "Holy Stone Drone",
      ],
      smartwatches: [
        "Fitness Smartwatch",
        "Android Smartwatch",
        "Womens Smart Watch",
        "Apple Smartwatch",
        "Smartwatch",
        "Mens Smart Watch",
        "Kids Smartwatch",
      ],
      soundbars: [
        "Sound Bar for TV",
        "Cheap Soundbar",
        "Sound Bar Mount",
        "TV Backlight",
        "Compact Soundbar",
        "TV & Home Audio",
        "Computer Speakers",
      ],
      
      drills: [
        "Power Tools",
        "Cordless Drill",
        "Battery Drill",
        "Impact Drill",
        "Electric Power Drill",
        "Cordless Impact Wrench",
        "Cordless Brushless Drill",
      ],
      earbuds: [
        "Affordable Earbuds",
        "Wireless Earbuds",
        "Premium Earbuds",
        "Bluetooth Earbuds",
      ],
    };

    const mainCategory = category?.toLowerCase() || "";
    const relevantCategories = categoryMap[mainCategory] || [];

    if (subcategory) {
      filteredProducts = couponData.filter((p) => p.category === subcategory);
    } else {
      filteredProducts = couponData.filter((p) =>
        relevantCategories.includes(p.category)
      );
    }

    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const topProducts = filteredProducts.slice(0, 3);
    setProducts(topProducts);

    if (topProducts.length > 0) {
      const first = topProducts[0];
      setSelectedProduct(first);
      setSelectedImage(first.images?.[0] || first.image);
    }
  }, [category, subcategory, isOpen]);

  // ✅ Close safeguard
  if (!isOpen) return null;

  // ✅ Handle image safely
  const handleImageError = (e) => {
    e.target.src = "/placeholder-image.jpg";
  };

  // -------------------------------
  // Subcategory Design
  // -------------------------------
  if (subcategory && selectedProduct) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-6">
        <div className="relative bg-[#fafafa] rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] p-4 sm:p-3 text-white flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold">Exclusive {subcategory} Deals</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8 items-center">
            {/* Left side - Info */}
            <div className="text-[#374151]">
              {selectedProduct.price && selectedProduct.originalPrice && (
                <div className="mt-2">
                  <span className="bg-[#f59e0b]/10 text-[#f59e0b] px-3 py-1 rounded-lg font-semibold">
                    Save {animatedDiscount}% OFF
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4 mt-2">
                {selectedProduct.logo && (
                  <img
                    src={selectedProduct.logo}
                    alt="logo"
                    onError={handleImageError}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain"
                  />
                )}
                <h3 className="text-lg sm:text-xl font-bold">{selectedProduct.name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-1">
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(selectedProduct.rating || 5)
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  {selectedProduct.rating} ({selectedProduct.reviews || 0} reviews)
                </span>
              </div>

              {/* Features */}
              <ul className="mt-5 space-y-2 text-sm text-gray-700">
                {selectedProduct.features?.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-[#06b6d4] mt-0.5 mr-2" />
                    {feature.replace(/^[•\-\s]*/, "")}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href={selectedProduct.alibabaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 sm:px-6 py-3 rounded-xl bg-[#f36620] hover:bg-[#06b6d4] text-white font-semibold transition duration-300"
                >
                  View Deal on Amazon
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex flex-col items-center w-full">
              <div className="border rounded-xl p-4 bg-white w-full flex justify-center mb-3">
                <img
                  src={selectedImage || selectedProduct.image}
                  onError={handleImageError}
                  alt={selectedProduct.name}
                  className="max-h-52 sm:max-h-60 object-contain rounded-lg"
                />
              </div>

              {/* Thumbnails */}
              {selectedProduct.images?.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`border-2 rounded-lg p-1 transition ${
                        selectedImage === img
                          ? "border-[#7c3aed]"
                          : "border-transparent hover:border-[#06b6d4]"
                      }`}
                    >
                      <img
                        src={img}
                        onError={handleImageError}
                        alt={`thumb-${idx}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------
  // Main Category Design
  // -------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-6">
      <div className="relative bg-[#fafafa] rounded-2xl shadow-2xl max-w-5xl w-full mx-auto max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] p-4 sm:p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">
              {subcategory
                ? `Top ${subcategory} Picks`
                : `Best ${category?.replace(/-/g, " ")} Deals`}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {subcategory
                ? `Check out highly-rated ${subcategory.toLowerCase()} options`
                : `Discover best ${category?.replace(/-/g, " ").toLowerCase()} deals`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto">
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found for this category.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product List */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4">
                  Recommended Products
                </h3>
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedProduct?.id === product.id
                        ? "border-[#7c3aed] bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-[#06b6d4] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={product.image || "/placeholder-image.jpg"}
                        onError={handleImageError}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                          {product.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < Math.floor(product.rating || 5)
                                    ? "fill-[#f59e0b] text-[#f59e0b]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500 ml-1">
                            {product.rating} ({product.reviews || 0})
                          </span>
                        </div>
                        <span className="mt-2 inline-block bg-[#f59e0b]/10 text-[#f59e0b] px-2 py-0.5 text-xs sm:text-sm rounded-lg font-semibold">
                          Save {getDiscountPercentage(product)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Product Details */}
              {selectedProduct && (
                <div className="bg-white rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>

                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <img
                        src={selectedProduct.image || "/placeholder-image.jpg"}
                        onError={handleImageError}
                        alt={selectedProduct.name}
                        className="h-36 sm:h-40 object-contain rounded-lg"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {selectedProduct.features?.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-[#7c3aed] mr-2 mt-0.5" />
                            {f.replace(/^[•\-\s]*/, "")}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <a
                        href={selectedProduct.alibabaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#7c3aed] hover:bg-[#06b6d4] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Deal on Amazon
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2">
            <span>⚡ Limited-time offers available</span>
            <button
              onClick={onClose}
              className="text-[#7c3aed] hover:text-[#06b6d4] font-medium"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
