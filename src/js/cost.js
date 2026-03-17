export function updateCost() {
    const data = JSON.parse(sessionStorage.getItem('ev_chart_data'));
    const tariffInput = document.getElementById('tariff-input');
    const totalCostEl = document.getElementById('total-cost');

    if (!totalCostEl || !data) 
        return;

    const tariff = parseFloat(tariffInput?.value);
    if (isNaN(tariff) || tariff <= 0) {
        if (tariffInput) 
            tariffInput.style.borderColor = '#ef4444';
        return;
    }
    tariffInput.style.borderColor = '';

    const avgPower = data.reduce((sum, v) => sum + v, 0) / data.length;
    const energyKwh = (avgPower * data.length) / 60;
    const cost = energyKwh * tariff;

    totalCostEl.textContent = `${cost.toFixed(2)} ₴`;
}

export function initCost() {
    const tariffInput = document.getElementById('tariff-input');
    if (tariffInput) 
        tariffInput.addEventListener('input', updateCost);
    
    updateCost();
}