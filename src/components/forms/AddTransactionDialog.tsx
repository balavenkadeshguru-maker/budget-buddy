import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TransactionType, CategoryType, CATEGORIES } from '@/types/expense';
import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (
    type: TransactionType,
    amount: number,
    category: CategoryType,
    description: string,
    date: Date
  ) => void;
}

export const AddTransactionDialog = ({ open, onOpenChange, onAdd }: AddTransactionDialogProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());

  const filteredCategories = CATEGORIES.filter(
    c => c.type === type || c.type === 'both'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd(type, parseFloat(amount), category, description || 'No description', date);
    
    // Reset form
    setAmount('');
    setCategory(null);
    setDescription('');
    setDate(new Date());
    onOpenChange(false);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType as TransactionType);
    setCategory(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Add Transaction</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Tabs */}
          <Tabs value={type} onValueChange={handleTypeChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger 
                value="expense" 
                className="data-[state=active]:bg-expense data-[state=active]:text-expense-foreground"
              >
                Expense
              </TabsTrigger>
              <TabsTrigger 
                value="income"
                className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
              >
                Income
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-lg h-12"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-4 gap-2">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all',
                    category === cat.id
                      ? 'border-primary bg-primary/10'
                      : 'border-transparent bg-secondary/50 hover:bg-secondary'
                  )}
                >
                  <CategoryIcon category={cat.id} size={20} />
                  <span className="text-xs font-medium truncate w-full text-center">
                    {cat.label.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="What was this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setDate(d)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            className={cn(
              'w-full h-12 font-semibold',
              type === 'expense' 
                ? 'bg-expense hover:bg-expense/90' 
                : 'bg-success hover:bg-success/90'
            )}
            disabled={!amount || !category}
          >
            Add {type === 'expense' ? 'Expense' : 'Income'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
