import React from "react";

export default function Metrics() {
  const stats = [
    { id: 1, value: "120+", label: "Projects Delivered", bg: "bg-blue-50" },
    { id: 2, value: "35+", label: "Happy Clients Worldwide", bg: "bg-pink-50" },
    { id: 3, value: "02+", label: "Years of Experience", bg: "bg-green-50" },
    { id: 4, value: "99%", label: "Client Satisfaction", bg: "bg-yellow-50" },
  ];

  return (
    <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-16 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <div>
 
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Trusted By Clients, Proven
            
              By Results
            </h2>
          </div>

          <div className="pt-2 lg:pt-6">
            <p className="text-white max-w-xl text-sm sm:text-base">
              We blend creativity with strategy—and the results speak for
              themselves. Our approach is focused on measurable outcomes,
              long-term partnerships, and building products that scale.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, idx) => (
              <div
                key={s.id}
                className={`${s.bg} rounded-xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700">
                    {/* simple icon placeholder */}
                    <span className="text-xs sm:text-sm">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-gray-900">{s.value}</div>
                </div>

                <div className="mt-4 sm:mt-6 text-gray-800 text-sm sm:text-base">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
