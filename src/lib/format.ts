const NBSP = " ";

function formatNumber(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function formatPrice(amount: number): string {
  return `${formatNumber(amount)}${NBSP}₽`;
}

export function formatPriceRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${formatNumber(min)}${NBSP}–${NBSP}${formatNumber(max)}${NBSP}₽`;
}

export function formatPriceFrom(amount: number): string {
  return `от${NBSP}${formatNumber(amount)}${NBSP}₽`;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}${NBSP}мин`;
  if (m === 0) return `${h}${NBSP}ч`;
  return `${h}${NBSP}ч${NBSP}${m}${NBSP}мин`;
}

export function reviewWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return "отзывов";
  if (mod10 === 1) return "отзыв";
  if (mod10 >= 2 && mod10 <= 4) return "отзыва";
  return "отзывов";
}
