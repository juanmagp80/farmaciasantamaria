declare module 'react-calendar' {
    import { ComponentType } from 'react';

    export interface CalendarProps {
        onChange?: (value: Date | Date[]) => void;
        value?: Date | Date[];
        minDate?: Date;
        locale?: string;
        className?: string;
        // Otros props que necesites...
    }

    const Calendar: ComponentType<CalendarProps>;
    export default Calendar;
}