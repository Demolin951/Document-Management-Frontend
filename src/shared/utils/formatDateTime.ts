function parseUtcDateTime(value: string): Date {
  const hasTimeZoneInfo = /([zZ]|[+-]\d{2}:?\d{2})$/.test(value);

  return new Date(hasTimeZoneInfo ? value : `${value}Z`);
}

export function formatDateTime(value: string): string {
  return parseUtcDateTime(value).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
