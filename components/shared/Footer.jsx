"use client";

import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

const categories = [
  { name: "Best Drones", href: "/category/drones" },
  { name: "Best Smart Watches", href: "/category/smartwatches" },
  { name: "Best Soundbars", href: "/category/soundbars" },
  { name: "Best Cordless Drills", href: "/category/drills" },
  { name: "Best Wireless Earbuds", href: "/category/earbuds" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Amazon Affiliate Advertiser Disclosure", href: "/advertiser-discloser" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="px-6 md:px-16 py-16  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Logo & Contact */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 leading-relaxed">
              Your trusted source for expert reviews and comparisons of the latest smart gadgets and technology.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <Mail className="h-4 w-4 text-cyan-500" />
                <span>info@bestgearbuy.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <Phone className="h-4 w-4 text-cyan-500" />
                <span> +1 808-301-5039 </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-purple-600 transition-colors duration-300">
                <MapPin className="h-4 w-4 text-cyan-500" />
                <span>532 Stone Rd Suite F Benicia, CA 94510</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Categories</h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium group flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium group flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6 text-lg">Stay Updated</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get the latest reviews and tech news delivered to your inbox.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 transition-all duration-300"
              />
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-200">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-500 font-medium text-sm">
            © 2025 SmartGadget Reviews. All rights reserved. | Expert reviews for smart technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
