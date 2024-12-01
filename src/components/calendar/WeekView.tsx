import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { getWeekDays, formatTime } from '../../utils/dateUtils';

interface WeekViewProps {
  date: Date;
  events: CalendarEvent[];
}

export const WeekView: React.FC<WeekViewProps> = ({ date, events }) => {
  const weekDays = getWeekDays(date);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b sticky top-0 bg-white z-10">
        <div className="p-4"></div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className="p-4 text-center border-l"
          >
            <div className="text-sm font-medium">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="text-2xl">{day.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="flex-1">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[100px_repeat(7,1fr)] min-h-[60px] border-b"
          >
            <div className="px-4 py-2 text-sm text-gray-500">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="relative border-l">
                {events
                  .filter((event) => {
                    const eventDate = new Date(event.start);
                    return (
                      eventDate.getDate() === day.getDate() &&
                      eventDate.getMonth() === day.getMonth() &&
                      eventDate.getFullYear() === day.getFullYear() &&
                      eventDate.getHours() === hour
                    );
                  })
                  .map((event) => (
                    <div
                      key={event.id}
                      className="absolute left-0 right-1 p-1 m-1 text-xs bg-blue-100 border-l-4 border-blue-500 rounded overflow-hidden"
                      style={{
                        top: `${(event.start.getMinutes() / 60) * 100}%`,
                        height: `${
                          ((event.end.getTime() - event.start.getTime()) /
                            (1000 * 60 * 60)) *
                          60
                        }px`,
                      }}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                      <div className="text-xs text-gray-600">
                        {formatTime(event.start)}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};