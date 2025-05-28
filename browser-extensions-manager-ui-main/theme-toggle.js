function setTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${theme}-theme`);
  localStorage.setItem('theme', theme);

  // Update icon visibility (optional)
  const moonIcon = document.querySelector('button img[alt="dark"]');
  const sunIcon = document.querySelector('button img[alt="light"]');
  if (theme === 'dark') {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'inline';
    document.querySelector('.theme').style.backgroundColor = 'rgb(62 61 54 / 65%)'
    document.getElementById("main-shape").setAttribute("fill", "#ffffff");
} else {
    moonIcon.style.display = 'inline';
    sunIcon.style.display = 'none';
    document.querySelector('.theme').style.backgroundColor = ''
    document.getElementById("main-shape").setAttribute("fill", "#000000");

  }
}

function toggleTheme() {
  const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
}

// On page load, set saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Set up the toggle button
  const themeToggleBtn = document.querySelector('.bar button');
  themeToggleBtn.addEventListener('click', toggleTheme);
});
