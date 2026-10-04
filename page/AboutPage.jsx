import React from "react";

const About = () => {
  return (
    <div className="bg-[#fafafa] text-[#374151] min-h-screen font-sans">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center py-28 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            About BestGearBuy
          </h1>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
            Your trusted source for unbiased smart gadget reviews, expert
            comparisons, and data-driven buying guides since 2023.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center space-y-6">
        <div className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] p-0.5 rounded-full mb-6">
          <div className="bg-white rounded-full px-6 py-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] font-bold text-lg">
              Our Mission
            </span>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-gray-700">
          In today's fast-paced tech world, finding the perfect smart gadget can
          feel overwhelming. With hundreds of options across categories like
          drones, smartwatches, soundbars, and more, how do you choose what's
          truly best for your needs?
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          That's where we come in. At{" "}
          <span className="font-semibold text-[#7c3aed]">BestGearBuy</span>, we
          test, analyze, and compare{" "}
          <span className="font-semibold text-[#f59e0b]">
            200+ smart gadgets
          </span>{" "}
          annually so you can make informed decisions with confidence.
        </p>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Unbiased Testing",
                desc: "We purchase all products ourselves and maintain no affiliate relationships that could influence our reviews.",
              },
              {
                icon: "📊",
                title: "Data-Driven Analysis",
                desc: "Our scoring system evaluates 50+ parameters across performance, value, and user experience.",
              },
              {
                icon: "⚡",
                title: "Real-World Testing",
                desc: "We test gadgets in actual usage scenarios, not just laboratory conditions.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#374151]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
            Our Expertise Areas
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Covering the most popular smart gadget categories with in-depth
            reviews and comparisons
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Best Drones",
                items: "25+ Models",
                color: "from-blue-500 to-cyan-500",
              },
              {
                name: "Best Smartwatch 2025",
                items: "30+ Models",
                color: "from-purple-500 to-pink-500",
              },
              {
                name: "Best Wireless Soundbar",
                items: "40+ Systems",
                color: "from-green-500 to-teal-500",
              },
              {
                name: "Best Cordless Drills",
                items: "35+ Tools",
                color: "from-orange-500 to-red-500",
              },
              {
                name: "Best Wireless Earbuds",
                items: "50+ Pairs",
                color: "from-indigo-500 to-purple-500",
              },
              {
                name: "Emerging Tech",
                items: "20+ Categories",
                color: "from-gray-600 to-gray-800",
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
              >
                <div
                  className={`w-12 h-1 rounded-full bg-gradient-to-r ${category.color} mb-4`}
                ></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-[#06b6d4] font-medium">
                  {category.items} Reviewed
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Our Review Process
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Comprehensive Research",
              desc: "We analyze market trends, user feedback, and technical specifications before testing begins.",
              color: "border-[#7c3aed]",
            },
            {
              step: "02",
              title: "Rigorous Testing",
              desc: "Each gadget undergoes 2-4 weeks of real-world testing across multiple usage scenarios.",
              color: "border-[#06b6d4]",
            },
            {
              step: "03",
              title: "Data Analysis & Scoring",
              desc: "We compile test results into easy-to-understand scores and detailed comparisons.",
              color: "border-[#f59e0b]",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className={`text-center p-8 border-t-4 ${step.color} bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow`}
            >
              <div className="text-5xl font-bold text-gray-200 mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Focus */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center border border-emerald-400 bg-opacity-10 px-4 py-2 rounded-full mb-6">
            <span className="text-[#0b84f5] font-semibold">
              SEO Optimized Content
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Built for Smart Shoppers & Search Engines
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Our content is meticulously crafted to answer your specific
            questions while being optimized for search engines. We focus on
            long-tail keywords, comprehensive buying guides, and regularly
            updated content to ensure you find exactly what you're looking for.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="text-[#7c3aed] font-bold">✓</div>
              <span className="text-gray-700">
                Regular content updates (200+ articles)
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-[#7c3aed] font-bold">✓</div>
              <span className="text-gray-700">
                Structured data markup implementation
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-[#7c3aed] font-bold">✓</div>
              <span className="text-gray-700">
                Mobile-first optimized design
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-[#7c3aed] font-bold">✓</div>
              <span className="text-gray-700">
                Fast loading speeds & Core Web Vitals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Join 50,000+ Smart Shoppers</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-100">
          Get weekly updates on the latest gadget reviews, exclusive deals, and
          expert buying advice delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a
            href="/contact"
            className="bg-white text-[#7c3aed] px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow hover:scale-105"
          >
            Contact Our Team
          </a>
          <a
            href="/newsletter"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#7c3aed] transition-all"
          >
            Subscribe Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
