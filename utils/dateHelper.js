import moment from 'moment';

export const dateFormat = (date, format = 'YYYY/MM/DD') => {
    return moment(date).format(format);
}

export const getStartOfMonth = (date) => {
    return moment(date).startOf('month').startOf('day');
}
export const getEndOfMonth = (date) => {
    return moment(date).endOf('month').endOf('day');
}