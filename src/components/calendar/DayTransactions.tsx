import { format } from 'date-fns';
import { Transaction, getCategoryInfo } from '@/types/expense';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, CalendarDays } from 'lucide-react';

interface DayTransactionsProps {
  date: Date;
  transactions: Transaction[];
}

export const DayTransactions = ({ date, transactions }: DayTransactionsProps) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="glass-card p-5 animate-scale-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <CalendarDays size={20} />
        </div>
        <div>
          <h3 className="font-display font-semibold">{format(date, 'EEEE')}</h3>
          <p className="text-sm text-muted-foreground">{format(date, 'MMMM d, yyyy')}</p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No transactions on this day</p>
        </div>
      ) : (
        <>
          {/* Day summary */}
          <div className="flex gap-4 mb-4 p-3 rounded-xl bg-secondary/50">
            {totalIncome > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <ArrowUpRight size={16} className="text-success" />
                <span className="text-success font-medium">₹{totalIncome.toLocaleString('en-IN')}</span>
              </div>
            )}
            {totalExpense > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <ArrowDownLeft size={16} className="text-expense" />
                <span className="text-expense font-medium">₹{totalExpense.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Transaction list */}
          <div className="space-y-2">
            {transactions.map((transaction) => {
              const category = getCategoryInfo(transaction.category);
              const isExpense = transaction.type === 'expense';

              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center',
                    isExpense ? 'bg-expense/10 text-expense' : 'bg-success/10 text-success'
                  )}>
                    <CategoryIcon category={transaction.category} size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{category.label}</p>
                  </div>

                  <span className={cn(
                    'font-semibold text-sm',
                    isExpense ? 'text-expense' : 'text-success'
                  )}>
                    {isExpense ? '-' : '+'}₹{transaction.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
