export const getPostedDate = (date: string) => {
  const currentDate = new Date();
  const memeDate = new Date(date);

  const diff = currentDate.getTime() - memeDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))} menit`;
  }
  if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))} jam`;
  }
  if (days < 7) {
    return `${days} hari`;
  }
  if (days > 30) {
    return `${Math.floor(days / 30)} bulan`;
  }
  if (days > 365) {
    return `${Math.floor(days / 365)} tahun`;
  }
};
