export function initHimEasterEgg(): void {
  const him = document.getElementById('him');

  if (!him) {
    throw new Error('HIM easter egg element not found');
  }

  const min = 7;
  const max = 12;
  const target = Math.floor(Math.random() * (max - min + 1)) + min;
  let count = 0;

  him.addEventListener('click', () => {
    count += 1;
    if (count >= target) {
      window.open('https://zh.wikipedia.org/wiki/Herobrine', '_blank', 'noopener');
      count = 0;
    }
  });
}
