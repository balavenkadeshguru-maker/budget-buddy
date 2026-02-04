import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Transaction } from '@/types/expense';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface MonthlyChartProps {
  transactions: Transaction[];
}

export const MonthlyChart = ({ transactions }: MonthlyChartProps) => {
  const data = useMemo(() => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(now, i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const monthTransactions = transactions.filter(t =>
        isWithinInterval(t.date, { start, end })
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        name: format(date, 'MMM'),
        income,
        expense,
      });
    }

    return months;
  }, [transactions]);

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="font-display text-lg font-semibold mb-4">Monthly Overview</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'income' ? 'Income' : 'Expense']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <Bar 
              dataKey="income" 
              fill="hsl(var(--success))" 
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar 
              dataKey="expense" 
              fill="hsl(var(--expense))" 
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-expense" />
          <span className="text-muted-foreground">Expense</span>
        </div>
      </div>
    </div>
  );
};
