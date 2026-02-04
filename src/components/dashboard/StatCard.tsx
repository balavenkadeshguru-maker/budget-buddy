import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant: 'income' | 'expense' | 'balance';
  subtitle?: string;
}

const variantStyles = {
  income: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
  expense: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white',
  balance: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white',
};

export const StatCard = ({ title, value, icon: Icon, variant, subtitle }: StatCardProps) => {
  return (
    <div className={cn('stat-card', variantStyles[variant])}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium opacity-90">{title}</span>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon size={20} />
          </div>
        </div>
        <p className="text-2xl font-display font-bold tracking-tight">${value}</p>
        {subtitle && (
          <p className="text-xs mt-1 opacity-75">{subtitle}</p>
        )}
      </div>
    </div>
  );
};
