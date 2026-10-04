"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "I'm thrilled with my purchase from this store! The drone is beautifully crafted, feature-packed, and durable. The customer service was outstanding. Highly recommend for anyone seeking quality drones!",
    author: "Michael Chen",
    role: "Photographer",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    text: "This smartwatch has exceeded all my expectations! The battery life is impressive, health tracking is accurate, and it looks stylish. The customer support team was incredibly helpful with setup.",
    author: "Sarah Johnson",
    role: "Fitness Instructor",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    text: "The soundbar delivers exceptional audio quality with deep bass and clear highs. Setup was a breeze and it looks elegant in my living room. Definitely worth the investment for movie lovers!",
    author: "David Wilson",
    role: "Audio Engineer",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    text: "This cordless drill is powerful, well-balanced, and the battery lasts through all my projects. The build quality is exceptional. A reliable tool for professionals and DIY enthusiasts alike.",
    author: "James Rodriguez",
    role: "Contractor",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    text: "These earbuds provide crystal clear sound with excellent noise cancellation. They're comfortable for all-day wear and the case provides multiple charges. Great value for the price!",
    author: "Emily Parker",
    role: "Commuter",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

export default function ReviewCarousel() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [currentReview]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToReview = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentReview(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 bg-gradient-to-br">
      {/* Section Header */}
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover why thousands of customers trust our expert reviews and
          recommendations
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Profile image with decorative elements */}
        <div className="flex-shrink-0 relative">
          <div className="relative">
            <img
              src={reviews[currentReview].image}
              alt={reviews[currentReview].author}
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-white transition-all duration-500 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />
            {/* Decorative circles */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-cyan-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Review content */}
        <div
          className={`flex-1 transition-all duration-500 ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {/* Quote icon */}
          <div className="mb-6">
            <Quote className="w-12 h-12 text-purple-400/30 transform -scale-x-100" />
          </div>

          {/* Review text */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6 italic font-light">
            {reviews[currentReview].text}
          </p>

          {/* Rating stars */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < reviews[currentReview].rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({reviews[currentReview].rating}/5)
            </span>
          </div>

          {/* Author info */}
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              {reviews[currentReview].author}
            </p>
            <p className="text-cyan-600 font-medium text-sm">
              {reviews[currentReview].role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="flex justify-center mt-3 space-x-3">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToReview(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentReview === index
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 scale-125 shadow-lg"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
