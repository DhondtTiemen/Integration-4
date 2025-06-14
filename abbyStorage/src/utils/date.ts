/**
 * Formats a timestamp into a relative time string like "5 min ago" or "2d ago".
 * @param timestamp - The timestamp to format, can be a number, string, or Date.
 * @returns A string representing how long ago the timestamp was.
 */
export function formatTimeAgo(timestamp: number | string | Date) {
  const postDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  if (diffMinutes < 1) return "1 min ago";
  else if (diffMinutes < 60) return `${diffMinutes} min ago`;
  else if (diffHours < 24) return `${diffHours}h ago`;
  else if (diffDays < 7) return `${diffDays}d ago`;
  else return `${diffWeeks}w ago`;
}

/**
 * Formats a datetime into a string with date and time.
 * @param datetime - The date/time to format, can be a number, string, or Date.
 * @returns A formatted string like "May 25, 2025 ◦ 5:00 PM" or empty string if invalid date.
 */
export function formatDateTime(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const datePart = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} • ${timePart}`;
}
