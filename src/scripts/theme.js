const toggleThemeButton = document.querySelector(".dark-mode--button");
const body = document.body;
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const THEME_KEY = "@openMusic:theme";
const DEFAULT_THEME = "light";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme || DEFAULT_THEME;
};

const setTheme = (theme) => {
  if (theme != "dark") {
    body.classList.add("dark__mode");
    toggleThemeButton.innerHTML = `
      <img src="/src/assets/icons/sun-icon.svg" alt="Light mode icon">
      <span class="night-button"></span>
    `;
  } else {
    body.classList.remove("dark__mode");
    toggleThemeButton.innerHTML = `
      <img src="/src/assets/icons/moon.svg" alt="Dark mode icon">
      <span class="night-button"></span>
    `;
  }
  localStorage.setItem(THEME_KEY, theme);
};

const toggleTheme = () => {
  const currentTheme = body.classList.contains("dark__mode") ? "dark" : "light";
  console.log(currentTheme)
  setTheme(currentTheme);
};

const initialTheme = getInitialTheme();
setTheme(initialTheme);

if (prefersDarkScheme.matches) {
  setTheme("dark");
}
 
toggleThemeButton.addEventListener("click", toggleTheme);

export {toggleTheme, getInitialTheme, setTheme}; 