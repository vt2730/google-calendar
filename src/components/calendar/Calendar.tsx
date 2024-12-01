import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { CalendarView, CalendarEvent } from '../../types/calendar';

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(new Date().setHours(10, 0)),
    end: new Date(new Date().setHours(11, 30)),
  },
  {
    id: '2',
    title: 'Lunch Break',
    start: new Date(new Date().setHours(12, 0)),
    end: new Date(new Date().setHours(13, 0)),
  },
  {
    id: '3',
    title: 'Project Review',
    start: new Date(new Date().setHours(14, 0)),
    end: new Date(new Date().setHours(15, 30)),
  },
];

export const Calendar: React.FC = () => {
  const [view, setView] = useState<CalendarView>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="flex flex-col h-screen bg-white">
      <CalendarHeader
        view={view}
        currentDate={currentDate}
        onViewChange={setView}
        onDateChange={setCurrentDate}
      />
      <div className="flex-1 overflow-hidden">
        {view === 'day' && <DayView date={currentDate} events={sampleEvents} />}
        {view === 'week' && <WeekView date={currentDate} events={sampleEvents} />}
        {view === 'month' && (
          <MonthView date={currentDate} events={sampleEvents} />
        )}
      </div>
    </div>
  );
};