import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  Heart,
  GraduationCap,
  Wallet,
  Laptop,
  TrendingUp,
  MoreHorizontal,
  LucideIcon,
} from 'lucide-react';
import { CategoryType } from '@/types/expense';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Gamepad2,
  Receipt,
  Heart,
  GraduationCap,
  Wallet,
  Laptop,
  TrendingUp,
  MoreHorizontal,
};

const categoryIconMap: Record<CategoryType, string> = {
  food: 'UtensilsCrossed',
  transport: 'Car',
  shopping: 'ShoppingBag',
  entertainment: 'Gamepad2',
  bills: 'Receipt',
  health: 'Heart',
  education: 'GraduationCap',
  salary: 'Wallet',
  freelance: 'Laptop',
  investment: 'TrendingUp',
  other: 'MoreHorizontal',
};

interface CategoryIconProps {
  category: CategoryType;
  className?: string;
  size?: number;
}

export const CategoryIcon = ({ category, className, size = 20 }: CategoryIconProps) => {
  const iconName = categoryIconMap[category];
  const Icon = iconMap[iconName] || MoreHorizontal;

  return <Icon className={cn(className)} size={size} />;
};
