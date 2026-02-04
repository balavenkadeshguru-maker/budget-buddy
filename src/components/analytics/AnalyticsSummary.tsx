import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnalyticsSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const AnalyticsSummary = ({ totalIncome, totalExpense, balance }: AnalyticsSummaryProps) => {
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const stats = [
    {
      label: 'Total Income',
      value: `$${totalIncome.toLocaleString()}`,
      icon: ArrowUpRight,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Total Expense',
      value: `$${totalExpense.toLocaleString()}`,
      icon: ArrowDownRight,
      color: 'text-expense',
      bgColor: 'bg-expense/10',
    },
    {
      label: 'Net Balance',
      value: `$${balance.toLocaleString()}`,
      icon: Wallet,
      color: balance >= 0 ? 'text-primary' : 'text-expense',
      bgColor: balance >= 0 ? 'bg-primary/10' : 'bg-expense/10',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: savingsRate >= 20 ? 'text-success' : 'text-amber-500',
      bgColor: savingsRate >= 20 ? 'bg-success/10' : 'bg-amber-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 animate-slide-up">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card p-4"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', stat.bgColor)}>
              <stat.icon size={16} className={stat.color} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
          <p className={cn('font-display text-xl font-bold', stat.color)}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
