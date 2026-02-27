import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import ProductSection from '@/components/home/ProductSection';
import Newsletter from '@/components/home/Newsletter';
import QuickViewModal from '@/components/product/QuickViewModal';
import { Product, getProductsForSection } from '@/data/mockData';

const sections: { title: string; key: Parameters<typeof getProductsForSection>[0]; path?: string }[] = [
  { title: 'Mostly Viewed', key: 'mostViewed' },
  { title: 'Best Sellers', key: 'bestSellers' },
  { title: 'Deep Discounts', key: 'deepDiscounts' },
  { title: 'New Arrivals', key: 'newArrivals' },
  { title: 'Airbags', key: 'airbags' },
  { title: 'Winter Gear', key: 'winterGear' },
  { title: 'Learn To Ride', key: 'learnToRide' },
  { title: 'New Riders', key: 'newRiders' },
  { title: 'Top Sellers', key: 'topSellers' },
  { title: 'Back In Stock', key: 'backInStock' },
];

export default function Index() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroBanner />
        {sections.map(s => (
          <ProductSection
            key={s.key}
            title={s.title}
            products={getProductsForSection(s.key)}
            onQuickView={setQuickViewProduct}
          />
        ))}
        <Newsletter />
      </main>
      <Footer />

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
