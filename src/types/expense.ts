export type TransactionType = 'income' | 'expense';

export type CategoryType = 
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'bills'
  | 'health'
  | 'education'
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'other';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: CategoryType;
  description: string;
  date: Date;
  createdAt: Date;
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  icon: string;
  color: string;
  type: TransactionType | 'both';
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'food', label: 'Food & Dining', icon: 'UtensilsCrossed', color: 'category-food', type: 'expense' },
  { id: 'transport', label: 'Transport', icon: 'Car', color: 'category-transport', type: 'expense' },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag', color: 'category-shopping', type: 'expense' },
  { id: 'entertainment', label: 'Entertainment', icon: 'Gamepad2', color: 'category-entertainment', type: 'expense' },
  { id: 'bills', label: 'Bills & Utilities', icon: 'Receipt', color: 'category-bills', type: 'expense' },
  { id: 'health', label: 'Health', icon: 'Heart', color: 'category-health', type: 'expense' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', color: 'category-education', type: 'expense' },
  { id: 'salary', label: 'Salary', icon: 'Wallet', color: 'success', type: 'income' },
  { id: 'freelance', label: 'Freelance', icon: 'Laptop', color: 'primary', type: 'income' },
  { id: 'investment', label: 'Investment', icon: 'TrendingUp', color: 'success', type: 'income' },
  { id: 'other', label: 'Other', icon: 'MoreHorizontal', color: 'category-other', type: 'both' },
];

export const getCategoryInfo = (categoryId: CategoryType): CategoryInfo => {
  return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
};
