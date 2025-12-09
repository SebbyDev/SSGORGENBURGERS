function calculateTotal() {
  const shell = document.querySelector('input[name="shell"]:checked');
  const protein = document.querySelector('input[name="protein"]:checked');
  const toppings = Array.from(document.querySelectorAll('.topping:checked'));

  let total = 0;

  if (shell) {
    total += parseFloat(shell.dataset.price);
  }
  if (protein) {
    total += parseFloat(protein.dataset.price);
  }
  toppings.forEach(t => {
    total += parseFloat(t.dataset.price);
  });

  // Update summary text
  const shellSummary = document.getElementById('summary-shell');
  const proteinSummary = document.getElementById('summary-protein');
  const toppingsSummary = document.getElementById('summary-toppings');
  const totalPriceEl = document.getElementById('total-price');

  shellSummary.textContent = shell ? shell.value : 'None';
  proteinSummary.textContent = protein ? protein.value : 'None';

  if (toppings.length === 0) {
    toppingsSummary.textContent = 'No toppings selected';
  } else {
    toppingsSummary.textContent = toppings.map(t => t.value).join(', ');
  }

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function resetBuild() {
  // Reset shell and protein to first options
  const firstShell = document.querySelector('input[name="shell"]');
  const firstProtein = document.querySelector('input[name="protein"]');

  document.querySelectorAll('input[name="shell"]').forEach(r => (r.checked = false));
  document.querySelectorAll('input[name="protein"]').forEach(r => (r.checked = false));
  document.querySelectorAll('.topping').forEach(c => (c.checked = false));

  if (firstShell) firstShell.checked = true;
  if (firstProtein) firstProtein.checked = true;

  calculateTotal();
}

document.addEventListener('DOMContentLoaded', () => {
  // Attach listeners to all inputs
  const allInputs = document.querySelectorAll('input[name="shell"], input[name="protein"], .topping');
  allInputs.forEach(input => {
    input.addEventListener('change', calculateTotal);
  });

  const resetBtn = document.getElementById('reset-btn');
  resetBtn.addEventListener('click', resetBuild);

  // Initial calculation
  calculateTotal();
});

