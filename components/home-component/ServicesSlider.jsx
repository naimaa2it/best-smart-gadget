"use client";

export default function ServicesBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-50 to-cyan-50 border-b border-purple-100 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Gifts */}
          <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-full shadow-lg group-hover:shadow-purple-200 transition-shadow">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                />
                <path d="M9 11H5v6a2 2 0 002 2h4v-8zm2 8v-8h4v6a2 2 0 01-2 2h-2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-purple-700 transition-colors">
                Free Gifts
              </div>
              <div className="text-xs text-gray-600">
                Free Gift Wrapping with Notes
              </div>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-3 rounded-full shadow-lg group-hover:shadow-cyan-200 transition-shadow">
              <svg
                className="w-6 h-6 text-cyan-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-cyan-700 transition-colors">
                Secure Payment
              </div>
              <div className="text-xs text-gray-600">
                100% Fast & Secure Payment
              </div>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-100 to-cyan-100 p-3 rounded-full shadow-lg group-hover:shadow-purple-200 transition-shadow">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-5a1 1 0 00-.293-.707l-4-4A1 1 0 0016 4H3z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-purple-700 transition-colors">
                Free Shipping
              </div>
              <div className="text-xs text-gray-600">On orders over $100</div>
            </div>
          </div>

          {/* 24/7 Support Services */}
          <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-cyan-100 to-purple-100 p-3 rounded-full shadow-lg group-hover:shadow-cyan-200 transition-shadow">
              <svg
                className="w-6 h-6 text-cyan-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm group-hover:text-cyan-700 transition-colors">
                24/7 Support Services
              </div>
              <div className="text-xs text-gray-600">
                Any Time Customer Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
