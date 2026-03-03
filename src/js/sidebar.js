/* Sidebar for phone */
const sidebar  = document.getElementById('sidebar');
const openBtn  = document.getElementById('open-menu');
const closeBtn = document.getElementById('close-menu');

if (openBtn && sidebar) 
    openBtn.addEventListener('click', () => sidebar.classList.remove('closed'));

if (closeBtn && sidebar) 
    closeBtn.addEventListener('click', () => sidebar.classList.add('closed'));