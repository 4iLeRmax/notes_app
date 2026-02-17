export default function lastNoteUpdate(note: Note) {
  let lastUpdate: Date;

  if (note.content.length === 0) {
    lastUpdate = note.updatedAt;
  } else {
    lastUpdate = note.content.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
    )[0].updatedAt;
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const timeNow = new Date();
  if (timeNow.getTime() - lastUpdate.getTime() < 24 * 60 * 60 * 1000) {
    return `${lastUpdate.getHours()}:${lastUpdate.getMinutes()}`;
  } else {
    return `${months[lastUpdate.getMonth()]} ${lastUpdate.getDate()} ${lastUpdate.getFullYear()}`;
  }
}
