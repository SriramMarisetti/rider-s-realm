import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { products, categories, getCompatibleProducts, Product } from '@/data/mockData';
import { SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const brandFilter = searchParams.get('brand');
  const modelFilter = searchParams.get('model');
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || '');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (brandFilter && modelFilter) {
      return getCompatibleProducts(brandFilter, modelFilter);
    }
    if (selectedCategory) {
      return products.filter(p => p.category === selectedCategory);
    }
    if (categoryFilter) {
      return products.filter(p => p.category === categoryFilter);
    }
    return products;
  }, [selectedCategory, categoryFilter, brandFilter, modelFilter]);

  const title = brandFilter && modelFilter
    ? `Accessories for ${brandFilter} ${modelFilter}`
    : selectedCategory || categoryFilter || 'All Products';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-bold text-2xl lg:text-3xl">{title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border text-sm font-medium hover:border-foreground transition-colors">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scroll-container pb-4 mb-6">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 text-xs font-medium whitespace-nowrap border transition-colors flex-shrink-0 ${
                !selectedCategory ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-foreground'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 text-xs font-medium whitespace-nowrap border transition-colors flex-shrink-0 ${
                  selectedCategory === cat.name ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-foreground'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex justify-center">
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found for this selection.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
