"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  Zap,
  ShoppingBag,
  Truck,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

// ✅ Correct Next.js metadata export (for SEO)
export const metadata = {
  title: "Contact | SmartGadget",
  description: "Get in touch with SmartGadget for product support, orders, and customer service.",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    orderNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      orderNumber: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: HeadphonesIcon,
      title: "Customer Support",
      description: "24/7 Product Assistance",
      details: "info@bestgearbuy.com",
      link: "mailto:info@bestgearbuy.com",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: ShoppingBag,
      title: "Order Support",
      description: "Order Tracking & Returns",
      details: "info@bestgearbuy.com",
      link: "mailto:info@bestgearbuy.com",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: Phone,
      title: "Sales Team",
      description: "Product Inquiries & Bulk Orders",
      details: " +1 808-301-5039 ",
      link: "tel:+15551234567",
      color: "from-purple-500 to-cyan-500",
    },
  ];

  const supportServices = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free shipping on orders over $100. 2-3 day delivery guaranteed.",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Warranty Support",
      description: "1-year warranty on all products. Easy claim process.",
      color: "text-cyan-600"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Average response time: 1-2 hours for urgent order issues.",
      color: "text-purple-600"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-2xl shadow-lg">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Customer Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help with your order, product questions, or returns? Our dedicated support team is here to assist you 24/7.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="group">
              <a
                href={item.link}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center border border-gray-100"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-md mb-4`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-gray-900 font-medium">{item.details}</p>
              </a>
            </div>
          ))}
        </div>

        <div>
          {/* Support Services & Quick Help */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Support Services */}
              <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Zap className="h-6 w-6 text-purple-600 mr-2" />
                  Our Support Services
                </h3>
                <div className="space-y-4">
                  {supportServices.map((service, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-gray-50">
                        <service.icon className={`h-5 w-5 ${service.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{service.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="flex-1 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-white mr-2" />
                  <h3 className="text-xl font-semibold">Quick Response Guarantee</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span>Order Issues</span>
                    <span className="font-bold">1-2 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/20">
                    <span>Product Support</span>
                    <span className="font-bold">2-4 hours</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/20">
                    <span>Returns & Refunds</span>
                    <span className="font-bold">4-6 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              🚀 Urgent Order Issues?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              For immediate assistance with urgent order problems, call our priority support line:
            </p>
            <a
              href="tel:+15551234567"
              className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              📞 Call Priority Support:  +1 808-301-5039 
            </a>
          </div>
        </div>

        {/* FAQ Section - E-commerce Focused */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  How do I track my order?
                </h4>
                <p className="text-gray-600 text-sm">
                  You'll receive a tracking number via email once your order ships. 
                  Use our order tracking page or contact support for real-time updates.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  What's your return policy?
                </h4>
                <p className="text-gray-600 text-sm">
                  30-day return policy for all products. Items must be in original 
                  condition with packaging. Free returns for defective products.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Do you offer international shipping?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes! We ship worldwide. Shipping costs and delivery times vary 
                  by location. Contact us for specific country rates.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  How do I use my warranty?
                </h4>
                <p className="text-gray-600 text-sm">
                  Register your product online after purchase. For warranty claims, 
                  contact support with your order number and issue description.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I modify or cancel my order?
                </h4>
                <p className="text-gray-600 text-sm">
                  Orders can be modified within 1 hour of placement. After shipping, 
                  you can refuse delivery or initiate a return.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Do you offer bulk discounts?
                </h4>
                <p className="text-gray-600 text-sm">
                  Yes! Contact our sales team for bulk pricing on orders over 10 units. 
                  We offer special corporate and educational discounts.
                </p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}
