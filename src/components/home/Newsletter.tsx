import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="bg-foreground py-16">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-background">Stay in the Fast Lane</h2>
        <p className="mt-3 text-background/60 text-sm">Get exclusive deals, new arrivals, and riding tips delivered to your inbox.</p>
        <form onSubmit={handleSubmit} className="mt-6 flex gap-0">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-background/10 text-background border border-background/20 px-4 py-3 text-sm placeholder:text-background/40 outline-none focus:border-primary"
            required
          />
          <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 font-semibold text-sm hover:bg-accent transition-colors btn-press flex items-center gap-2">
            <Send size={16} />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
