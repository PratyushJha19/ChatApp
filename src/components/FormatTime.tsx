// utils/formatTime.ts
export const formatTime = (timeStamp: string | number | Date): string => {
  const date = new Date(timeStamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
