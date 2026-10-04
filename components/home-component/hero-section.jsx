"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const animationRef = useRef(null);
  const router = useRouter();

  const sliderData = [
    {
      title: "Premium Drones",
      subtitle: "Collection",
      leftImage: "/hero-img/drone.png",
      rightImage: "/hero-img/drone2.png",
      view_collection: "/category/drones",
      description: "SHOP WISE WITH PRICE COMPARISONS",
    },
    {
      title: "Smart Gadgets",
      subtitle: "Reviews",
      leftImage: "/hero-img/earbud.png",
      rightImage: "/hero-img/earbud2.png",
      view_collection: "/category/earbuds",
      description: "FIND THE BEST DEALS ON QUALITY PRODUCTS",
    },
    {
      title: "Tech Accessories", 
      subtitle: "Selection",
      leftImage: "/hero-img/watch2.png",
      rightImage: "/hero-img/watch.png",
      view_collection: "/category/smartwatches",
      description: "COMPARE PRICES ACROSS TOP RETAILERS",
    },
  ];

  // Safe state update function
  const safeSetState = (setter, value) => {
    if (isMounted) {
      setter(value);
    }
  };

  // Component mount/unmount
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Reset animation stage when slide changes
  useEffect(() => {
    if (!isMounted) return;

    safeSetState(setAnimationStage, 0);

    // Clear any existing timeouts
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Animate in sequence with safe checks
    const timeouts = [
      setTimeout(() => safeSetState(setAnimationStage, 1), 300),
      setTimeout(() => safeSetState(setAnimationStage, 2), 800),
      setTimeout(() => safeSetState(setAnimationStage, 3), 1800)
    ];

    animationRef.current = timeouts[timeouts.length - 1];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [currentSlide, isMounted]);

  // Auto-slide effect
  useEffect(() => {
    if (!isMounted || sliderData.length === 0) return;

    const interval = setInterval(() => {
      safeSetState(setCurrentSlide, (prev) => (prev + 1) % sliderData.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [sliderData.length, isMounted]);

  const nextSlide = () => {
    if (sliderData.length === 0) return;
    safeSetState(setCurrentSlide, (prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    if (sliderData.length === 0) return;
    safeSetState(setCurrentSlide, (prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  const handleViewCollection = (path) => {
    if (!path || typeof path !== 'string') return;
    try {
      router.push(path);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to regular link if router fails
      window.location.href = path;
    }
  };

  const handleCategoriesClick = () => {
    try {
      // Safe scroll with fallback
      if (typeof window !== 'undefined' && window.scrollBy) {
        window.scrollBy({ 
          top: window.innerHeight * 0.6, 
          behavior: 'smooth' 
        });
      }
    } catch (error) {
      console.error('Scroll error:', error);
      // Fallback to simple scroll
      window.scrollBy(0, 600);
    }
  };

  // Safe image component with error handling
  const SafeImage = ({ src, alt, className }) => {
    const [imageError, setImageError] = useState(false);
    
    const handleError = () => {
      setImageError(true);
    };

    if (imageError || !src) {
      return (
        <div className={`${className} bg-gray-200 flex items-center justify-center rounded-lg`}>
          <span className="text-gray-500 text-xs">Image not available</span>
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt || "Product image"}
        className={className}
        onError={handleError}
        loading="lazy"
      />
    );
  };

  // Don't render if no data
  if (!sliderData || sliderData.length === 0) {
    return (
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <p className="text-gray-500">No content available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden h-[50vh] xs:h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[85vh] flex items-center bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-cyan-200"></div>
      </div>

      {/* Slider container */}
      <div className="relative w-full h-full">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Content */}
            <div className="relative container mx-auto px-3 xs:px-4 sm:px-6 h-full flex items-center z-10">
              {/* Mobile Layout: Column layout with text on top, image on bottom */}
              <div className="lg:hidden flex flex-col w-full h-full justify-center items-center pt-4 pb-8">
                
                {/* Text Content - Top Section */}
                <div className={`flex-1 flex flex-col justify-center items-center text-center mb-4 transform transition-all duration-700 ${
                  index === currentSlide && animationStage >= 2
                    ? "translate-y-0 opacity-100"
                    : index === currentSlide
                    ? "-translate-y-10 opacity-0"
                    : "opacity-0"
                }`}>
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2 leading-tight uppercase tracking-wide">
                    {slide.title || "Featured Products"}
                  </h1>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-light text-cyan-500 mb-3 uppercase tracking-wider">
                    {slide.subtitle || "Collection"}
                  </h2>

                  <p className="text-sm xs:text-base text-gray-600 mb-6 max-w-xs xs:max-w-sm mx-auto font-normal tracking-wide leading-relaxed">
                    {slide.description || "Discover amazing products"}
                  </p>

                  {/* Buttons */}
                  <div className={`transform transition-all duration-1000 ease-out ${
                    index === currentSlide && animationStage >= 3
                      ? "translate-y-0 opacity-100"
                      : index === currentSlide
                      ? "translate-y-[100vh] opacity-0"
                      : "opacity-0"
                  }`}>
                    <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                      <button 
                        onClick={() => handleViewCollection(slide.view_collection)}
                        className="group inline-flex items-center justify-center px-6 xs:px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 min-w-[160px]"
                      >
                        VIEW COLLECTION
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button 
                        onClick={handleCategoriesClick}
                        className="group inline-flex items-center justify-center px-6 xs:px-8 py-3 bg-transparent text-gray-700 font-semibold rounded-xl border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105 min-w-[160px]"
                      >
                        CATEGORIES
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Image - Bottom Section */}
                <div className={`flex-1 flex items-center justify-center transform transition-all duration-1000 ease-out ${
                  index === currentSlide && animationStage >= 1
                    ? "translate-y-0 opacity-100 scale-100"
                    : index === currentSlide
                    ? "translate-y-20 opacity-0 scale-90"
                    : "opacity-0"
                }`}>
                  <SafeImage
                    src={slide.rightImage}
                    alt={slide.title}
                    className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] h-auto max-h-[180px] xs:max-h-[200px] sm:max-h-[250px] object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Desktop Layout: Row layout with images on sides */}
              <div className="hidden lg:flex w-full justify-between items-center gap-8">
                
                {/* Left image */}
                <div className={`w-2/5 transform transition-all duration-1000 ease-out ${
                  index === currentSlide && animationStage >= 1
                    ? "translate-x-0 opacity-100"
                    : index === currentSlide
                    ? "-translate-x-[100vw] opacity-0"
                    : "opacity-0"
                }`}>
                  <SafeImage
                    src={slide.leftImage}
                    alt={slide.title}
                    className="w-full h-auto max-h-[360px] object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text content */}
                <div className={`flex-1 px-4 transform transition-all duration-700 ${
                  index === currentSlide && animationStage >= 2
                    ? "translate-y-0 opacity-100"
                    : index === currentSlide
                    ? "-translate-y-10 opacity-0"
                    : "opacity-0"
                } text-center`}>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-2 leading-tight uppercase tracking-wide">
                    {slide.title || "Featured Products"}
                  </h1>
                  <h2 className="text-2xl lg:text-3xl font-light text-cyan-500 mb-6 uppercase tracking-wider">
                    {slide.subtitle || "Collection"}
                  </h2>

                  <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto font-normal tracking-wide">
                    {slide.description || "Discover amazing products"}
                  </p>

                  {/* Buttons */}
                  <div className={`flex justify-center transform transition-all duration-1000 ease-out ${
                    index === currentSlide && animationStage >= 3
                      ? "translate-y-0 opacity-100"
                      : index === currentSlide
                      ? "translate-y-[100vh] opacity-0"
                      : "opacity-0"
                  }`}>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleViewCollection(slide.view_collection)}
                        className="group inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
                      >
                        VIEW COLLECTION
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button 
                        onClick={handleCategoriesClick}
                        className="group inline-flex items-center justify-center px-8 py-3 bg-transparent text-gray-700 font-semibold rounded-xl border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        CATEGORIES
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right image */}
                <div className={`w-2/5 transform transition-all duration-1000 ease-out ${
                  index === currentSlide && animationStage >= 1
                    ? "translate-x-0 opacity-100"
                    : index === currentSlide
                    ? "translate-x-[100vw] opacity-0"
                    : "opacity-0"
                }`}>
                  <SafeImage
                    src={slide.rightImage}
                    alt={slide.title}
                    className="w-full h-auto max-h-[360px] object-contain transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        {sliderData.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 border border-gray-200 p-2 sm:p-3 rounded-full text-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 z-20 shadow-lg hover:shadow-purple-500/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 border border-gray-200 p-2 sm:p-3 rounded-full text-gray-700 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 z-20 shadow-lg hover:shadow-cyan-500/30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
          </>
        )}

        {/* Slide indicators */}
        {sliderData.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {sliderData.map((_, index) => (
              <button
                key={index}
                onClick={() => safeSetState(setCurrentSlide, index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-purple-600 scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}