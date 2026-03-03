function getStoredData() {
    let data = JSON.parse(sessionStorage.getItem('ev_chart_data'));
    if (!data || data.length < 12) {
        data = [];
        for (let i = 0; i < 11; i++) 
            data.push(Math.floor(Math.random() * 80) + 10);
        
        data.push(48.2); 
        sessionStorage.setItem('ev_chart_data', JSON.stringify(data));
    }
    return data;
}

function renderCharts() {
    const data = getStoredData();
    const now = new Date();
    const currentHour = now.getHours();

    /* Chart for index.html */
    const smallChartPath = document.querySelector('.chart-path');
    if (smallChartPath) {
        const smallData = data.slice(-8);
        const labels = document.querySelectorAll('.chart-hour-label');
        
        if (labels.length > 0) {
            const hours = [];
            for (let i = 7; i >= 0; i--) {
                let h = currentHour - i;
                if (h < 0) 
                    h += 24;

                hours.push(h + ':00');
            }
            labels.forEach((el, i) => el.textContent = hours[i]);
        }

        const svgPoints = smallData.map((val, i) => {
            const x = (i / 7) * 100;
            const y = 100 - val; 
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        smallChartPath.setAttribute('d', svgPoints);
    }

    /* Chart for statistic.html */
    const largeChartPath = document.getElementById('large-chart-path');
    const largeChartArea = document.getElementById('large-chart-area');
    const largeLabelsContainer = document.getElementById('large-chart-labels');
    
    if (largeChartPath && largeChartArea && largeLabelsContainer) {
        if (largeLabelsContainer.children.length === 0) {
            for (let i = 11; i >= 0; i--) {
                let h = currentHour - i;
                if (h < 0) 
                    h += 24;

                const span = document.createElement('span');
                span.textContent = h + ':00';
                if (i % 2 !== 0) 
                    span.classList.add('hidden', 'md:block');

                largeLabelsContainer.appendChild(span);
            }
        }

        const pathString = data.map((val, i) => {
            const x = (i / 11) * 100;
            const y = 100 - ((val / 120) * 100); 
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(' ');

        const areaString = `${pathString} L 100,100 L 0,100 Z`;

        largeChartPath.setAttribute('d', pathString);
        largeChartArea.setAttribute('d', areaString);
    }
}

/* Simulating a change in chart */
function updateLivePower() {
    let data = getStoredData();
    let currentPower = data[data.length - 1];
    
    currentPower = currentPower + (Math.random() * 2 - 1);
    if (currentPower < 0) 
        currentPower = 0;

    if (currentPower > 120) 
        currentPower = 120;
    
    data[data.length - 1] = currentPower;
    sessionStorage.setItem('ev_chart_data', JSON.stringify(data));

    const powerEl = document.getElementById('power-val');
    if (powerEl) 
        powerEl.innerText = `${currentPower.toFixed(1)} kW`;
    
    renderCharts();
}

renderCharts();
setInterval(updateLivePower, 3000);

/* Generate new chart */
const regenBtn = document.getElementById('regenerate-chart');
if (regenBtn) {
    regenBtn.addEventListener('click', () => {
        const icon = regenBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 500);
        }

        let newData = [];
        for (let i = 0; i < 11; i++) 
            newData.push(Math.floor(Math.random() * 80) + 10);
        
        newData.push(48.2); 

        sessionStorage.setItem('ev_chart_data', JSON.stringify(newData));
        renderCharts();
    });
}