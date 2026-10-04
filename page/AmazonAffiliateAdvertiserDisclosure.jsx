import React from "react";

const AmazonAffiliateAdvertiserDisclosure = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-800 bg-clip-text text-transparent mb-4">
            Amazon Affiliate Advertiser Disclosure
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <div className="prose prose-lg max-w-none">
            {/* Decorative elements */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              <span className="font-semibold text-slate-900">
                bestgearbuy.com
              </span>{" "}
              is a participant in the Amazon Services LLC Associates Program, an
              affiliate advertising program designed to provide a means for
              sites to earn advertising fees by advertising and linking to
              Amazon.com.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl border-l-4 border-blue-400 mb-6">
              <p className="text-gray-700 leading-relaxed">
                Some of the links on this website are "affiliate links." This
                means if you click on a link to Amazon, and then make a
                purchase, we may receive a small commission at no extra cost to
                you. Our use of these affiliate links does not affect the price
                you pay for any products, nor does it influence our editorial
                content.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              We only recommend products that we believe will be useful for our
              readers. Our reviews and opinions are our own. We strive to
              provide accurate information, though we cannot guarantee that
              every specification, price, or availability detail is always
              up-to-date; please verify before purchasing.
            </p>

            {/* Contact section */}
            <div className="bg-slate-900/5 p-6 rounded-xl mt-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 text-emerald-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Questions?
              </h3>
              <p className="text-gray-700">
                If you have any questions about our disclosure, feel free to
                contact us via the information on our site.
              </p>
            </div>
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AmazonAffiliateAdvertiserDisclosure;
