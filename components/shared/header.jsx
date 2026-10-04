// Header.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import productsData from "@/data/products.json";
import Logo from "./Logo";

const categories = [
  { name: "Drones", href: "/category/drones" },
  { name: "Smart Watches", href: "/category/smartwatches" },
  { name: "Soundbars", href: "/category/soundbars" },
  { name: "Cordless Drills", href: "/category/drills" },
  { name: "Earbuds", href: "/category/earbuds" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      let foundCategory = null;

      // 🔍 Search all categories for product name match
      for (const [catName, catData] of Object.entries(productsData.categories)) {
        const match = catData.products.find((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (match) {
          foundCategory = catName;
          break;
        }
      }

      if (foundCategory) {
        router.push(
          `/category/${foundCategory.toLowerCase().replace(/\s+/g, "-")}?q=${encodeURIComponent(
            searchTerm
          )}`
        );
      } else {
        alert("No product found!");
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="px-4 sm:px-6 md:px-16">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-semibold text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 relative group"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-12 w-64 h-12 rounded-xl border-gray-300 bg-gray-50 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm font-semibold text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {/* Mobile Search */}
            <div className="px-4 mt-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="pl-12 w-full h-12 rounded-xl border-gray-300 bg-gray-50 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
