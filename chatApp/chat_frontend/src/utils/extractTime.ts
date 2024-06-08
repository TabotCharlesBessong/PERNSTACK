export const extractTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${hours}:${minutes}`
};

const padZero = (num: number) => {
  return num.toString().padStart(2, "0");
};
