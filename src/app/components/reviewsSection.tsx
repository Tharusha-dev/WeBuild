import React from 'react';

// You can move this to a separate file like 'assets/reviews.json' later
const REVIEWS = [
  {
    "review": "Highly recommended, Tharusha did an impeccable job, well inside timelines I requested and to a standard much higher than I expected...",
    "rating": 5.0,
    "country": "🇦🇺",
    "platform": "Upwork"
  },
  {
    "review": "Cannot recommend Tharusha highly enough, fast, high quality work",
    "rating": 5.0,
    "country": "🇦🇺",
    "platform": "Upwork"
  },
  {
    "review": "Fantastic work again from Tharusha. We really enjoy working with him and appreciate all his hard work!",
    "rating": 5.0,
    "country": "🇬🇧",
    "platform": "Upwork"
  },
  {
    "review": "Tharusha is excellent. I would highly recommend.",
    "rating": 5.0,
    "country": "🇬🇧",
    "platform": "Upwork"
  },
  {
    "review": "Tharusha J was an absolute pleasure to work with! Their CODE EXPERTISE and professionalism truly exceeded my expectations...",
    "rating": 5.0,
    "country": "🇵🇰",
    "platform": "Upwork"
  },
  {
    "review": "Great job as usual",
    "rating": 5.0,
    "country": "🇺🇸",
    "platform": "Upwork"
  },
  {
    "review": "Highly recommended very good",
    "rating": 5.0,
    "country": "🇰🇼",
    "platform": "Fiverr"
  },
  {
    "review": "He built an extension for me with a connected database. He proposed the best solution with fair pricing. Overall, it was a great experience...",
    "rating": 5.0,
    "country": "🇺🇸",
    "platform": "Upwork"
  },
  {
    "review": "EXCELLENT",
    "rating": 5.0,
    "country": "🇬🇧",
    "platform": "Upwork"
  },
  {
    "review": "Good quality code. Very professional.",
    "rating": 4.3,
    "country": "🇺🇸",
    "platform": "Fiverr"
  },
  {
    "review": "Very Keen coder, attention to detail and smart approach to deliver the work and code professionally, highly recommended",
    "rating": 5.0,
    "country": "🇵🇰",
    "platform": "Fiverr"
  }
];

export default function ReviewsSection() {
  return (
    <section className="bg-[#6E65C7] text-white border-t border-white/20 py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
               <span className="font-mono text-xs font-bold tracking-widest uppercase border border-white/30 px-2 py-1 rounded">
                 [STATUS: VETTED_EXPERTS]
               </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              CLIENT LOGS
            </h2>
          </div>
          
          <div className="max-w-md text-right md:text-left">
            <p className="font-mono text-sm opacity-80 leading-relaxed border-l-2 border-white pl-4">
              // Our agency is run by top-rated freelancers.<br/>
              // Verified reviews from Upwork & Fiverr.
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/20">
          {REVIEWS.map((item, index) => (
            <div 
              key={index}
              className="group relative border-r border-b border-white/20 bg-white/5 p-8 transition-colors hover:bg-white hover:text-[#6E65C7] flex flex-col justify-between min-h-[280px]"
            >
              {/* Metadata Header */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 font-mono text-xs opacity-60 group-hover:opacity-100 uppercase tracking-wider">
                <span>ENTRY_{index + 1 < 10 ? `0${index+1}` : index+1}</span>
                <div className="flex items-center gap-2">
                   <span>{item.platform}</span>
                   <span className="text-md md:text-lg leading-none filter grayscale group-hover:grayscale-0">{item.country}</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-8">
                <span className="font-mono text-xl font-bold opacity-30 select-none">"</span>
                <p className="font-medium text-lg leading-snug line-clamp-4 group-hover:line-clamp-none transition-all">
                  {item.review}
                </p>
              </div>

              {/* Rating Footer */}
              <div className="mt-auto flex flex-col md:flex-row items-start md:items-center justify-between border-t border-dashed border-white/30 group-hover:border-[#6E65C7]/30 pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-current' : 'fill-transparent stroke-current'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="font-mono text-xs font-bold">
                  RATING: {item.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Stat */}
        <div className="mt-8 flex justify-between items-center font-mono text-xs opacity-50 uppercase border-t border-white/10 pt-4">
           <span>Total Entries: {REVIEWS.length}</span>
           <span>Average Rating: 4.98 / 5.0</span>
        </div>

      </div>
    </section>
  );
}