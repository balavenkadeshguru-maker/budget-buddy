import { useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, Plus } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Navigation, TabType } from '@/components/layout/Navigation';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { ExpenseCalendar } from '@/components/calendar/ExpenseCalendar';
import { DayTransactions } from '@/components/calendar/DayTransactions';
import { MonthlyChart } from '@/components/analytics/MonthlyChart';
import { AnalyticsSummary } from '@/components/analytics/AnalyticsSummary';
import { AddTransactionDialog } from '@/components/forms/AddTransactionDialog';
import { useTransactions } from '@/hooks/useTransactions';
import { format } from 'date-fns';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    transactions,
    addTransaction,
    deleteTransaction,
    getTransactionsByDate,
    getDatesWithTransactions,
    summary,
    recentTransactions,
  } = useTransactions();

  const selectedDayTransactions = getTransactionsByDate(selectedDate);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Income"
                value={summary.totalIncome.toLocaleString()}
                icon={TrendingUp}
                variant="income"
                subtitle="This month"
              />
              <StatCard
                title="Total Expenses"
                value={summary.totalExpense.toLocaleString()}
                icon={TrendingDown}
                variant="expense"
                subtitle="This month"
              />
              <StatCard
                title="Balance"
                value={summary.balance.toLocaleString()}
                icon={Wallet}
                variant="balance"
                subtitle={format(new Date(), 'MMMM yyyy')}
              />
            </div>

            {/* Charts and Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart expensesByCategory={summary.expensesByCategory} />
              <RecentTransactions 
                transactions={recentTransactions} 
                onDelete={deleteTransaction}
              />
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseCalendar
                transactions={transactions}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                getDatesWithTransactions={getDatesWithTransactions}
              />
              <DayTransactions
                date={selectedDate}
                transactions={selectedDayTransactions}
              />
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <AnalyticsSummary
              totalIncome={summary.totalIncome}
              totalExpense={summary.totalExpense}
              balance={summary.balance}
            />
            <MonthlyChart transactions={transactions} />
            <ExpenseChart expensesByCategory={summary.expensesByCategory} />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in">
            <div className="glass-card p-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} />
              </div>
              <h2 className="font-display text-xl font-bold mb-2">ExpenseFlow</h2>
              <p className="text-muted-foreground mb-6">Your personal finance companion</p>
              
              <div className="space-y-3 text-left max-w-sm mx-auto">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="font-medium">Export Data</p>
                  <p className="text-sm text-muted-foreground">Coming soon - Export to PDF/Excel</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="font-medium">Budget Planning</p>
                  <p className="text-sm text-muted-foreground">Coming soon - Set monthly budgets</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <p className="font-medium">Cloud Sync</p>
                  <p className="text-sm text-muted-foreground">Coming soon - Backup your data</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsAddDialogOpen(true)}
        className="floating-button"
        aria-label="Add transaction"
      >
        <Plus size={24} />
      </button>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Add Transaction Dialog */}
      <AddTransactionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addTransaction}
      />
    </div>
  );
};

export default Index;
