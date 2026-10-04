"use client";

import {
  Shield,
  Lock,
  Eye,
  User,
  Cookie,
  Database, // ✅ replaced Data with Database
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "January 1, 2025";

  const sections = [
    {
      icon: Database, // ✅ using Database instead of Data
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          points: [
            "Name and contact details (email address, phone number)",
            "Account information (username, password)",
            "Payment information (processed securely through third-party providers)",
            "Communication preferences",
          ],
        },
        {
          subtitle: "Usage Data",
          points: [
            "IP address and browser type",
            "Pages visited and time spent on site",
            "Device information and operating system",
            "Clickstream data and browsing patterns",
          ],
        },
        {
          subtitle: "Cookies and Tracking",
          points: [
            "Session cookies for website functionality",
            "Analytics cookies for site improvement",
            "Preference cookies for personalized experience",
            "Advertising cookies (with user consent)",
          ],
        },
      ],
    },
    {
      icon: Shield,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Provision",
          points: [
            "Provide and maintain our review services",
            "Process transactions and deliver products",
            "Send technical notices and updates",
            "Respond to comments and questions",
          ],
        },
        {
          subtitle: "Improvement & Analytics",
          points: [
            "Analyze usage patterns to improve our website",
            "Develop new products and features",
            "Conduct research and analysis",
            "Monitor and prevent technical issues",
          ],
        },
        {
          subtitle: "Communication",
          points: [
            "Send promotional communications (with consent)",
            "Provide customer support",
            "Send administrative information",
            "Notify about policy changes",
          ],
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        {
          subtitle: "Security Measures",
          points: [
            "SSL encryption for data transmission",
            "Regular security assessments and audits",
            "Access controls and authentication",
            "Data anonymization where possible",
          ],
        },
        {
          subtitle: "Data Retention",
          points: [
            "Personal data kept only as long as necessary",
            "Regular review of stored information",
            "Secure deletion procedures",
            "Backup and disaster recovery protocols",
          ],
        },
      ],
    },
    {
      icon: User,
      title: "Your Rights & Choices",
      content: [
        {
          subtitle: "Access and Control",
          points: [
            "Right to access your personal data",
            "Right to correct inaccurate information",
            "Right to delete your data",
            "Right to restrict or object to processing",
          ],
        },
        {
          subtitle: "Communication Preferences",
          points: [
            "Opt-out of marketing communications",
            "Cookie preferences management",
            "Notification settings control",
            "Account deletion requests",
          ],
        },
      ],
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking Technologies",
      content: [
        {
          subtitle: "Types of Cookies",
          points: [
            "Essential cookies (required for site functionality)",
            "Performance cookies (analytics and improvement)",
            "Functionality cookies (personalized features)",
            "Targeting cookies (advertising purposes)",
          ],
        },
        {
          subtitle: "Managing Cookies",
          points: [
            "Browser settings to refuse cookies",
            "Opt-out tools for specific tracking technologies",
            "Cookie preference center on our website",
            "Do-Not-Track signals support",
          ],
        },
      ],
    },
    {
      icon: Shield,
      title: "Third-Party Sharing",
      content: [
        {
          subtitle: "Service Providers",
          points: [
            "Payment processors (Stripe, PayPal)",
            "Analytics providers (Google Analytics)",
            "Cloud storage services (AWS, Google Cloud)",
            "Customer support platforms",
          ],
        },
        {
          subtitle: "Legal Requirements",
          points: [
            "When required by law or legal process",
            "To protect our rights and property",
            "In connection with business transfers",
            "To prevent illegal activities",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-2xl shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated:{" "}
            <span className="font-semibold text-purple-600">{lastUpdated}</span>
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At SmartGadget, we are committed to protecting your privacy and
            ensuring transparency about how we collect, use, and safeguard your
            personal information.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-50 to-cyan-50 border-b border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-3 rounded-xl mr-4">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {section.content.map((subsection, subIndex) => (
                  <div key={subIndex} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mr-3"></span>
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.points.map((point, pointIndex) => (
                        <li
                          key={pointIndex}
                          className="flex items-start text-gray-700"
                        >
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact + Updates */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 text-purple-600 mr-2" />
                Contact Our Privacy Team
              </h3>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or your data,
                contact our privacy team:
              </p>
              <div className="space-y-2">
                <p className="text-purple-600 font-medium">
                  privacy@smartgadget.com
                </p>
                <p className="text-sm text-gray-500">
                  We respond within 48 hours
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Policy Updates
              </h3>
              <p className="text-gray-600 mb-4">
                We may update this policy periodically. Significant changes will
                be communicated through:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  Email notifications to registered users
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  Website banners and announcements
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  Updated "last modified" date
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Consent Acknowledgement */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white text-center">
          <h3 className="text-lg font-semibold mb-2">Your Privacy Matters</h3>
          <p className="opacity-90">
            By using SmartGadget, you acknowledge that you have read and
            understood this Privacy Policy. We are committed to protecting your
            information and being transparent about our practices.
          </p>
        </div>
      </div>
    </div>
  );
}
