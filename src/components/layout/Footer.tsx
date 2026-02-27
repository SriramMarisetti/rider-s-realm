import { Link } from 'react-router-dom';

const footerLinks = {
  Shop: ['Helmets', 'Riding Gears', 'Parts', 'Accessories', 'Tires'],
  Support: ['Contact Us', 'FAQs', 'Shipping Info', 'Returns', 'Size Guide'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Affiliate Program'],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="font-display font-bold text-xl tracking-tight">
              <span className="text-primary">⚡</span> BikersHub
            </Link>
            <p className="mt-3 text-sm text-background/60 leading-relaxed">
              Premium motorcycle accessories for riders who demand the best. Gear up, ride safe.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm tracking-wide mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">© 2026 BikersHub. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-background/40">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
