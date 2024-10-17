export function getHHMM(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function currentDate(): string {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

export function combineTodayWithTime(time: string): string {
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
    throw new Error('Invalid time format. Please use "hh:mm"');
  }

  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${time}`;
}

export function convertToDateTime(dateTimeString: string): Date {
  const regex = /^(\d{2})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
  const match = dateTimeString.match(regex);

  if (!match) {
    throw new Error('Invalid date-time format. Please use "yy-mm-dd hh:mm"');
  }

  const [, year, month, day, hours, minutes] = match;

  const fullYear = parseInt(year) + 2000;

  const date = new Date(
    fullYear,
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date-time values");
  }

  return date;
}
