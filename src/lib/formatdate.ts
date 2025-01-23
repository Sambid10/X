import {format,differenceInDays,differenceInHours,differenceInMinutes} from "date-fns"

export  const formatDate = (dateInput: Date) => {
    const date = new Date(dateInput) 
    const now = new Date();
  
    const daysDiff = differenceInDays(now, date);
    const hoursDiff = differenceInHours(now, date);
    const minutesDiff = differenceInMinutes(now, date);
  
    if (daysDiff >= 1 && daysDiff < 365) {
        // If between 1 day and 1 year, show as "Mon Day" (e.g., "Oct 28")
        return `·${format(date, 'MMM d')}`;
      } else if (daysDiff >= 365) {
        // If more than 1 year, show as "Year, Mon Day" (e.g., "2023, Oct 28")
        return `·${format(date, 'yyyy, MMM d')}`;
      } else if (hoursDiff >= 1) {
        // If more than 1 hour but less than 1 day, show as "Xhr" (e.g., "8hr")
        return `·${hoursDiff}hr`;
      } else if (minutesDiff >= 1) {
        // If more than 1 minute but less than 1 hour, show as "Xmin" (e.g., "15min")
        return `·${minutesDiff}min`;
      } else {
        // If less than 1 minute, show "just now"
        return `·just now`;
      }
  };
  