import React from 'react';
import { CalendarEvent } from '../../types/calendar';
import { formatTime } from '../../utils/dateUtils';

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
}

export const DayView: React.FC<DayViewProps> = ({ date, events }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {hours.map((hour) => (
        <div
          key={hour}
          className="grid grid-cols-[100px_1fr] min-h-[60px] border-b"
        >
          <div className="px-4 py-2 text-sm text-gray-500">
            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
          </div>
          <div className="relative border-l">
            {events
              .filter((event) => {
                const eventHour = event.start.getHours();
                return eventHour === hour;
              })
              .map((event) => (
                <div
                  key={event.id}
                  className="absolute left-0 right-4 p-2 m-1 text-sm bg-blue-100 border-l-4 border-blue-500 rounded"
                  style={{
                    top: `${(event.start.getMinutes() / 60) * 100}%`,
                    height: `${
                      ((event.end.getTime() - event.start.getTime()) /
                        (1000 * 60 * 60)) *
                      60
                    }px`,
                  }}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-xs text-gray-600">
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};