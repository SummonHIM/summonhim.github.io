export function initHimEasterEgg(): void {
  const him = document.getElementById('him');
  const tooltip = document.getElementById('him-tooltip');

  if (!him || !tooltip) {
    throw new Error('HIM easter egg elements not found');
  }

  him.addEventListener('click', () => {
    tooltip.hidden = !tooltip.hidden;
  });
}
