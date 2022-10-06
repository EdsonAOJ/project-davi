/* eslint import/no-duplicates: off */
import { ptBR } from 'date-fns/locale';
import {
    format,
    parseISO,
    isPast,

    differenceInMinutes,
    differenceInDays,
} from 'date-fns';


export function formatDate(date) {
    const parsed = parseISO(date);
    return format(parsed, 'PPP', { locale: ptBR });
}

export function formateDateAndTime(date) {
    const parsed = parseISO(date);

    return format(parsed, 'Pp', {
        locale: ptBR,
    });
}

export function formatDateToISO(date) {
    return new Date(date).toISOString();
}

export function checkIfDateIsPast(compareDate) {
    return isPast(parseISO(compareDate));
}

export function formatCalendaryDate(date) {
    const parsed = new Date(date);

    return `${parsed
        .getDate()
        .toString()
        .padStart(2, '0')} ${parsed.toLocaleString('default', {
            month: 'short',
        })} de ${parsed.getUTCFullYear()}`;
}



export function formatDateToRhSearch() {
    const date = new Date();

    const year = date.getFullYear();
    const day = date.getDate();
    const monthNumber =
        date.getMonth() === 0 ? date.getMonth() + 1 : date.getMonth();
    const month = monthNumber < 10 ? `0${monthNumber}` : monthNumber;

    return `${year}-${month}-${day}`;
}

export function checkIfMeetingIsNear(meetingDate) {
    const parsed = parseISO(meetingDate);

    const now = new Date();
    const difference = differenceInMinutes(parsed, now);

    return difference;
}

export function checkDifferenceInDays(date) {
    const now = new Date();
    const parsed = parseISO(date);
    const differenceDays = differenceInDays(now, parsed);

    return differenceDays;
}
