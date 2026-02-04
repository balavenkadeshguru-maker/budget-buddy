import { useState, useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Transaction } from '@/types/expense';
import { cn } from '@/lib/utils';

interface ExpenseCalendarProps {
  transactions: Transaction[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  getDatesWithTransactions: (month: Date) => Record<string, { hasIncome: boolean; hasExpense: boolean }>;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ExpenseCalendar = ({ 
  transactions, 
  selectedDate, 
  onDateSelect,
  getDatesWithTransactions 
}: ExpenseCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const datesWithTransactions = useMemo(() => 
    getDatesWithTransactions(currentMonth), 
    [currentMonth, getDatesWithTransactions]
  );

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const dayData = datesWithTransactions[dateKey];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={index}
              onClick={() => onDateSelect(day)}
              className={cn(
                'calendar-day',
                !isCurrentMonth && 'text-muted-foreground/40',
                isSelected && 'selected',
                isToday && !isSelected && 'ring-2 ring-primary/30',
                dayData?.hasExpense && !isSelected && 'has-expense',
                dayData?.hasIncome && !dayData?.hasExpense && !isSelected && 'has-income',
              )}
            >
              {format(day, 'd')}
              {dayData && (dayData.hasExpense || dayData.hasIncome) && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {dayData.hasExpense && (
                    <div className="w-1 h-1 rounded-full bg-expense" />
                  )}
                  {dayData.hasIncome && (
                    <div className="w-1 h-1 rounded-full bg-success" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
