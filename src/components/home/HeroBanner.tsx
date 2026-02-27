import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';

const slides = [
  {
    image: heroBanner1,
    subtitle: 'NEW SEASON COLLECTION',
    title: 'Ride with\nConfidence',
    description: 'Premium gear engineered for performance and protection.',
    cta1: { label: 'Shop Now', path: '/shop' },
    cta2: { label: 'Explore Helmets', path: '/shop?category=Helmets' },
  },
  {
    image: heroBanner2,
    subtitle: 'SAFETY FIRST',
    title: 'Helmets That\nDefine You',
    description: 'DOT & ECE certified helmets from top global brands.',
    cta1: { label: 'Browse Helmets', path: '/shop?category=Helmets' },
    cta2: { label: 'View All Gear', path: '/shop' },
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden bg-foreground">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt="" className="w-full h-full object-cover opacity-60" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-xl" key={current}>
          <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] mb-4 animate-fade-in-up">
            {slide.subtitle}
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-background leading-[1.05] whitespace-pre-line animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {slide.title}
          </h1>
          <p className="mt-4 text-background/70 text-base md:text-lg max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {slide.description}
          </p>
          <div className="mt-8 flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to={slide.cta1.path}
              className="bg-primary text-primary-foreground px-8 py-3.5 text-sm font-semibold hover:bg-accent transition-colors btn-press"
            >
              {slide.cta1.label}
            </Link>
            <Link
              to={slide.cta2.path}
              className="border border-background/30 text-background px-8 py-3.5 text-sm font-semibold hover:bg-background/10 transition-colors btn-press"
            >
              {slide.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)} className="p-2 text-background/60 hover:text-background transition-colors" aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-4 bg-background/30'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={() => setCurrent(c => (c + 1) % slides.length)} className="p-2 text-background/60 hover:text-background transition-colors" aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
