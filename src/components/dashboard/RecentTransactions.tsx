import { format } from 'date-fns';
import { Transaction, getCategoryInfo } from '@/types/expense';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, Trash2 } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

export const RecentTransactions = ({ transactions, onDelete }: RecentTransactionsProps) => {
  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="font-display text-lg font-semibold mb-4">Recent Transactions</h3>
      
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No transactions yet</p>
        ) : (
          transactions.map((transaction, index) => {
            const category = getCategoryInfo(transaction.category);
            const isExpense = transaction.type === 'expense';

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors group"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center',
                  isExpense ? 'bg-expense/10 text-expense' : 'bg-success/10 text-success'
                )}>
                  <CategoryIcon category={transaction.category} size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{category.label}</span>
                    <span>•</span>
                    <span>{format(transaction.date, 'MMM d')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={cn(
                      'flex items-center gap-1 font-semibold',
                      isExpense ? 'text-expense' : 'text-success'
                    )}>
                      {isExpense ? (
                        <ArrowDownLeft size={14} />
                      ) : (
                        <ArrowUpRight size={14} />
                      )}
                      <span>₹{transaction.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {onDelete && (
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
