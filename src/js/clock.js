/* Clock update */
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) 
        return;
    
    const now = new Date();
    const days = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'];
    clockEl.innerHTML = 
        `<i class="fa-regular fa-calendar-check mr-1 md:mr-2"></i>` +
        `${days[now.getDay()]}, ${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getFullYear()} ` +
        `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}
updateClock();
setInterval(updateClock, 1000);