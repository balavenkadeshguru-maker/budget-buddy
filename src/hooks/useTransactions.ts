import { useState, useCallback, useMemo } from 'react';
import { Transaction, TransactionType, CategoryType } from '@/types/expense';
import { startOfMonth, endOfMonth, isWithinInterval, format, isSameDay } from 'date-fns';

// Sample data for demo
const generateSampleTransactions = (): Transaction[] => {
  const now = new Date();
  const transactions: Transaction[] = [
    { id: '1', type: 'income', amount: 5000, category: 'salary', description: 'Monthly Salary', date: new Date(now.getFullYear(), now.getMonth(), 1), createdAt: new Date() },
    { id: '2', type: 'expense', amount: 45, category: 'food', description: 'Grocery shopping', date: new Date(now.getFullYear(), now.getMonth(), 2), createdAt: new Date() },
    { id: '3', type: 'expense', amount: 25, category: 'transport', description: 'Uber ride', date: new Date(now.getFullYear(), now.getMonth(), 3), createdAt: new Date() },
    { id: '4', type: 'expense', amount: 120, category: 'shopping', description: 'New headphones', date: new Date(now.getFullYear(), now.getMonth(), 5), createdAt: new Date() },
    { id: '5', type: 'expense', amount: 80, category: 'entertainment', description: 'Movie night', date: new Date(now.getFullYear(), now.getMonth(), 7), createdAt: new Date() },
    { id: '6', type: 'income', amount: 500, category: 'freelance', description: 'Side project', date: new Date(now.getFullYear(), now.getMonth(), 10), createdAt: new Date() },
    { id: '7', type: 'expense', amount: 200, category: 'bills', description: 'Electricity bill', date: new Date(now.getFullYear(), now.getMonth(), 12), createdAt: new Date() },
    { id: '8', type: 'expense', amount: 60, category: 'health', description: 'Pharmacy', date: new Date(now.getFullYear(), now.getMonth(), 15), createdAt: new Date() },
    { id: '9', type: 'expense', amount: 150, category: 'education', description: 'Online course', date: new Date(now.getFullYear(), now.getMonth(), 18), createdAt: new Date() },
    { id: '10', type: 'expense', amount: 35, category: 'food', description: 'Restaurant dinner', date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2), createdAt: new Date() },
    { id: '11', type: 'expense', amount: 15, category: 'transport', description: 'Bus pass', date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), createdAt: new Date() },
    { id: '12', type: 'expense', amount: 28, category: 'food', description: 'Coffee & snacks', date: new Date(), createdAt: new Date() },
  ];
  return transactions;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions);

  const addTransaction = useCallback((
    type: TransactionType,
    amount: number,
    category: CategoryType,
    description: string,
    date: Date = new Date()
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      category,
      description,
      date,
      createdAt: new Date(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const getTransactionsByDate = useCallback((date: Date) => {
    return transactions.filter(t => isSameDay(t.date, date));
  }, [transactions]);

  const getTransactionsByMonth = useCallback((date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return transactions.filter(t => 
      isWithinInterval(t.date, { start, end })
    );
  }, [transactions]);

  const summary = useMemo(() => {
    const now = new Date();
    const monthTransactions = getTransactionsByMonth(now);
    
    const totalIncome = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const expensesByCategory = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<CategoryType, number>);

    return {
      totalIncome,
      totalExpense,
      balance,
      expensesByCategory,
    };
  }, [getTransactionsByMonth]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);
  }, [transactions]);

  const getDatesWithTransactions = useCallback((month: Date) => {
    const monthTransactions = getTransactionsByMonth(month);
    const dates: Record<string, { hasIncome: boolean; hasExpense: boolean }> = {};
    
    monthTransactions.forEach(t => {
      const key = format(t.date, 'yyyy-MM-dd');
      if (!dates[key]) {
        dates[key] = { hasIncome: false, hasExpense: false };
      }
      if (t.type === 'income') dates[key].hasIncome = true;
      if (t.type === 'expense') dates[key].hasExpense = true;
    });
    
    return dates;
  }, [getTransactionsByMonth]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    getTransactionsByDate,
    getTransactionsByMonth,
    getDatesWithTransactions,
    summary,
    recentTransactions,
  };
};
