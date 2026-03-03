/* Toggling theme */
function applyTheme(isDark, animate = false) {
    const mainBg = document.getElementById('main-bg');
    const icon   = document.getElementById('theme-icon');
    const text   = document.getElementById('theme-text');

    if (mainBg) {
        if (!animate) 
            mainBg.classList.add('no-transition');
        
        mainBg.classList.toggle('dark-bg', isDark);
        mainBg.classList.toggle('light-bg', !isDark);
        
        if (!animate) 
            requestAnimationFrame(() => mainBg.classList.remove('no-transition'));
        
    }

    if (icon) 
        icon.className = isDark ? 'fa-solid fa-sun mr-4' : 'fa-solid fa-moon mr-4';

    if (text) 
        text.innerText = isDark ? 'Light mode' : 'Dark mode';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

const toggle = document.getElementById('theme-toggle');
if (toggle) {
    toggle.addEventListener('click', () => {
        const isDark = localStorage.getItem('theme') === 'dark';
        applyTheme(!isDark, true); /* Switch with animate */
    });
}

applyTheme(localStorage.getItem('theme') === 'dark'); /* Switch without animate */

window.addEventListener('storage', (e) => {
    if (e.key === 'theme') 
        applyTheme(e.newValue === 'dark', true);
});