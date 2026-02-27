import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/data/mockData';
import ProductCard from '@/components/product/ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllPath?: string;
  onQuickView?: (product: Product) => void;
}

export default function ProductSection({ title, products, viewAllPath = '/shop', onQuickView }: ProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (products.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">{title}</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll('left')} className="hidden md:flex p-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="hidden md:flex p-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
            <Link to={viewAllPath} className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors ml-2">
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Desktop: horizontal scroll, Mobile: grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-container pb-2 md:pb-0"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
}
