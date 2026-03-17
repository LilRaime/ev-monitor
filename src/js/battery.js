import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/+esm';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);
export function initBatteryChart() {
    const canvas = document.getElementById('battery-chart');
    if (!canvas) 
        return;

    const now = new Date();
    const labels = [];
    for (let i = 11; i >= 0; i--) {
        let h = now.getHours() - i;
        if (h < 0) 
            h += 24;
        labels.push(h + ':00');
    }

    const endLevel = 70 + Math.random() * 5;
    const startLevel = 10 + Math.random() * 10;
    const data = [];

    for (let i = 0; i < 12; i++) {
        const progress = i / 11;
        const base = startLevel + (endLevel - startLevel) * progress;
        const noise = (Math.random() - 0.3) * 3;
        const value = Math.min(100, Math.max(0, base + noise));
        data.push(parseFloat(value.toFixed(1)));
    }

    new Chart(canvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Battery %',
                data,
                borderColor: '#84cc16',
                backgroundColor: 'rgba(132, 204, 22, 0.1)',
                borderWidth: 2.5,
                pointRadius: 4,
                pointBackgroundColor: '#84cc16',
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 4,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.parsed.y}%`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#6b7280', font: { size: 11 } },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        color: '#6b7280',
                        font: { size: 11 },
                        callback: val => val + '%'
                    },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}