import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, ChevronDown, X, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { bikebrands } from '@/data/mockData';

const navItems = [
  { label: 'Shop by Bike', hasDropdown: true },
  { label: 'Helmets', path: '/shop?category=Helmets' },
  { label: 'Riding Gears', path: '/shop?category=Riding+Gears' },
  { label: 'Parts', path: '/shop?category=Parts' },
  { label: 'Accessories', path: '/shop?category=Accessories' },
  { label: 'Tires', path: '/shop?category=Tires' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopByBikeOpen, setShopByBikeOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFindAccessories = () => {
    if (selectedBrand && selectedModel) {
      navigate(`/shop?brand=${encodeURIComponent(selectedBrand)}&model=${encodeURIComponent(selectedModel)}`);
      setShopByBikeOpen(false);
      setSelectedBrand('');
      setSelectedModel('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border ${
          scrolled ? 'header-blur shadow-header' : 'bg-background'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-foreground">
            <span className="text-primary">⚡</span>
            BikersHub
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => setShopByBikeOpen(!shopByBikeOpen)}
                    className="nav-link-underline flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${shopByBikeOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.path!}
                    className="nav-link-underline px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/login" className="p-2.5 text-foreground hover:text-primary transition-colors" aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative p-2.5 text-foreground hover:text-primary transition-colors" aria-label="Cart">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground px-1">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-foreground hover:text-primary transition-colors"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border bg-background animate-slide-in-up">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <Search size={18} className="text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search helmets, gear, accessories..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-placeholder"
                />
                <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shop by Bike Dropdown */}
        {shopByBikeOpen && (
          <div className="hidden lg:block absolute top-full left-0 right-0 glass-dropdown border-t border-border animate-slide-in-up">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-end gap-4 max-w-2xl">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={e => { setSelectedBrand(e.target.value); setSelectedModel(''); }}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a brand</option>
                    {Object.keys(bikebrands).map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Model</label>
                  <select
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Choose a model</option>
                    {selectedBrand && bikebrands[selectedBrand]?.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <button
                  onClick={handleFindAccessories}
                  disabled={!selectedBrand || !selectedModel}
                  className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-accent transition-colors btn-press disabled:opacity-50"
                >
                  Find Accessories
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-background border-l border-border shadow-xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-display font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map(item => (
                item.hasDropdown ? (
                  <div key={item.label} className="py-2">
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                    <div className="mt-2 ml-3 space-y-1">
                      {Object.keys(bikebrands).map(brand => (
                        <Link
                          key={brand}
                          to={`/shop?brand=${encodeURIComponent(brand)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-sm text-foreground hover:text-primary"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path!}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2.5 text-sm font-medium text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
