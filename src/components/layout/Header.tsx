import { format } from 'date-fns';
import { Wallet, Bell } from 'lucide-react';

export const Header = () => {
  const today = new Date();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-primary">ExpenseFlow</h1>
              <p className="text-xs text-muted-foreground">{format(today, 'EEEE, MMMM d')}</p>
            </div>
          </div>

          <button className="relative p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};
