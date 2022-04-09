import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ko from 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale(ko);


export { dayjs }
