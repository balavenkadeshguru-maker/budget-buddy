import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CategoryType, getCategoryInfo, CATEGORIES } from '@/types/expense';

interface ExpenseChartProps {
  expensesByCategory: Record<CategoryType, number>;
}

const COLORS = [
  'hsl(24, 95%, 55%)',   // food
  'hsl(210, 90%, 55%)',  // transport
  'hsl(280, 70%, 55%)',  // shopping
  'hsl(330, 80%, 55%)',  // entertainment
  'hsl(45, 95%, 50%)',   // bills
  'hsl(142, 70%, 45%)',  // health
  'hsl(200, 85%, 50%)',  // education
  'hsl(220, 15%, 50%)',  // other
];

export const ExpenseChart = ({ expensesByCategory }: ExpenseChartProps) => {
  const data = Object.entries(expensesByCategory)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => {
      const info = getCategoryInfo(category as CategoryType);
      return {
        name: info.label,
        value,
        category,
      };
    })
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  if (data.length === 0) {
    return (
      <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="font-display text-lg font-semibold mb-4">Spending by Category</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          No expenses this month
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="font-display text-lg font-semibold mb-4">Spending by Category</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="transition-opacity hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.slice(0, 4).map((item, index) => (
          <div key={item.category} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="truncate text-muted-foreground">{item.name}</span>
            <span className="font-medium ml-auto">{Math.round((item.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
