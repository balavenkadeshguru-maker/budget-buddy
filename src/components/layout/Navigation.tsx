import { Home, Calendar, PieChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'dashboard' | 'calendar' | 'analytics' | 'settings';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItems: { id: TabType; icon: typeof Home; label: string }[] = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'analytics', icon: PieChart, label: 'Analytics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                activeTab === id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className={cn(
                'relative p-2 rounded-xl transition-all',
                activeTab === id && 'bg-primary/10'
              )}>
                <Icon size={22} />
                {activeTab === id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export type { TabType };
