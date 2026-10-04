"use client";

import { useState, useEffect } from "react";
import featureProducts from "../../data/featureProducts.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const TABS = ["#1 Best Seller", "Featured", "Amazon's Choice"];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else setItemsPerPage(8);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  if (!isMounted) return null; // prevent SSR hydration errors

  const filteredProducts =
    activeTab === "Featured"
      ? featureProducts
      : featureProducts.filter((p) => p.badge === activeTab);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const start = currentIndex * itemsPerPage;
  const visibleProducts = filteredProducts.slice(start, start + itemsPerPage);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return (
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-500 text-sm">
            {i < stars ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 px-4 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
          Featured products
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`pb-2 font-medium transition-colors ${
                activeTab === tab
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setCurrentIndex(0);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-lg border border-cyan-200 p-4 text-center hover:shadow-md transition"
            >
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                  -
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) *
                      100
                  )}
                  %
                </div>
              )}

              <div className="h-30 flex items-center justify-center mb-2">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              <h3 className="font-medium text-base text-gray-700 line-clamp-1">
                {product.name}
              </h3>

              {renderStars(product.rating)}

              <a
                href={product.alibabaUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-2 w-full border border-amber-500 text-gray-700 py-1.5 rounded hover:bg-amber-50 transition-colors font-medium"
              >
                <span className="flex items-center">View on</span>
                <Image
                  src="/amazon-logo.svg"
                  alt="Amazon"
                  width={44}
                  height={44}
                  className="object-contain mt-2"
                />
              </a>
            </div>
          ))}

          {/* Arrows */}
          {filteredProducts.length > itemsPerPage && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-50 text-purple-600"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-50 text-purple-600"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
