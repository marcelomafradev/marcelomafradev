export function calculateTimeDifference(createdAt: Date) {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifferenceInMs = now.getTime() - createdAtDate.getTime();
  const weeksDifference = Math.floor(
    timeDifferenceInMs / 1000 / 60 / 60 / 24 / 7,
  );
  const daysDifference = Math.floor(timeDifferenceInMs / 1000 / 60 / 60 / 24);
  const hoursDifference = Math.floor(timeDifferenceInMs / 1000 / 60 / 60);
  const minutesDifference = Math.floor(timeDifferenceInMs / 1000 / 60);

  if (weeksDifference > 0) {
    return formatTimeDifference(weeksDifference, 'semana');
  } else if (daysDifference > 0) {
    return formatTimeDifference(daysDifference, 'dia');
  } else if (hoursDifference > 0) {
    return formatTimeDifference(hoursDifference, 'hora');
  } else {
    return formatTimeDifference(minutesDifference, 'minuto');
  }
}

function formatTimeDifference(value: number, unit: string) {
  return `há ${value} ${unit}${value === 1 ? '' : 's'}`;
}
