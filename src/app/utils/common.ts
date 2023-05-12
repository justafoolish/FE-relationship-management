export function msToTime(ms: number | string) {
  // const seconds = (+ms / 1000).toFixed(1);
  const minutes = (+ms / (1000 * 60)).toFixed(1);
  const hours = (+ms / (1000 * 60 * 60)).toFixed(0);
  const days = (+ms / (1000 * 60 * 60 * 24)).toFixed(0);
  // if (+seconds < 60) return seconds + ' Sec';
  if (+minutes < 60) return minutes + ' Min';
  else if (+hours < 24) return hours + ' hours';
  else return days + ' days';
}

export const getRemainTime = (from: string | number | undefined, to: string | number | undefined) =>
  msToTime(new Date(from ?? 0).getTime() - new Date(to ?? 0).getTime());
