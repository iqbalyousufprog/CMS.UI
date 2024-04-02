import { Time } from "@angular/common";

export function convertToDateTime(date: string, time: string) : Date
{
    const dateTime = new Date(date);
    // Split the time value into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);
    // Set the time component of the current date to the extracted hours and minutes
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    return dateTime;
}

export function extractTimeFromDate(date: Date) : string
{
    const dateObject = date;

    // Extract the time component from the Date object
    const hours = ('0' + dateObject.getHours()).slice(-2);
    const minutes = ('0' + dateObject.getMinutes()).slice(-2);

    // Format the time as 'HH:mm'
    const formattedTime = `${hours}:${minutes}`;

    // Set the value of the timeControl FormControl to the formatted time

    return formattedTime;
}