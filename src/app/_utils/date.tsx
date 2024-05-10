import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function parseDate(date: number) {
  return dayjs.unix(date).format("MMMM DD, YYYY");
}

export function timeAgo(date: number) {
  return dayjs.unix(date).fromNow();
}
