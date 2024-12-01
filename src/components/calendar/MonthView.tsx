import React from 'react';
import { CalendarEvent, DayCell } from '../../types/calendar';
import { getDaysInMonth, isToday } from '../../utils/dateUtils';

interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
}

export const MonthView: React.FC<MonthViewProps> = ({ date, events }) => {
  const days = getDaysInMonth(date);
  const currentMonth = date.getMonth();

  const getDayEvents = (day: Date): CalendarEvent[] => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <div className="grid grid-cols-7 flex-1 divide-x divide-y">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div
          key={day}
          className="p-2 text-sm font-medium text-gray-700 text-center border-b"
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-[120px] p-2 ${
            day.getMonth() !== currentMonth ? 'bg-gray-50' : ''
          } ${isToday(day) ? 'bg-blue-50' : ''}`}
        >
          <div className="text-right">
            <span
              className={`text-sm ${
                day.getMonth() !== currentMonth ? 'text-gray-400' : ''
              } ${
                isToday(day)
                  ? 'bg-blue-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center'
                  : ''
              }`}
            >
              {day.getDate()}
            </span>
          </div>
          <div className="mt-2">
            {getDayEvents(day)
              .slice(0, 3)
              .map((event) => (
                <div
                  key={event.id}
                  className="text-xs mb-1 truncate bg-blue-100 text-blue-700 rounded px-2 py-1"
                >
                  {event.title}
                </div>
              ))}
            {getDayEvents(day).length > 3 && (
              <div className="text-xs text-gray-500">
                +{getDayEvents(day).length - 3} more
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};