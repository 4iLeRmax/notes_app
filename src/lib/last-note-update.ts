export default function lastNoteUpdate(note: Note) {
  let lastUpdate: Date;

  if (note.content.length === 0) {
    lastUpdate = new Date(note.updatedAt);
  } else {
    lastUpdate = new Date(
      note.content.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )[0].updatedAt,
    );
    if (lastUpdate.getTime() < new Date(note.updatedAt).getTime()) {
      lastUpdate = new Date(note.updatedAt);
    }
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

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  const timeNow = new Date();
  if (timeNow.getTime() - lastUpdate.getTime() < 24 * 60 * 60 * 1000) {
    return `${formatNumber(lastUpdate.getHours())}:${formatNumber(lastUpdate.getMinutes())}`;
  } else {
    return `${months[lastUpdate.getMonth()]} ${lastUpdate.getDate()} ${lastUpdate.getFullYear()}`;
  }
}
