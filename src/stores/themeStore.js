// Theme Store — Pinia store for Dark/Light theme management
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(localStorage.getItem("theme_preference") === "dark");

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem("theme_preference", isDark.value ? "dark" : "light");
    applyTheme();
  }

  // Apply theme on store creation
  applyTheme();

  return { isDark, toggleTheme, applyTheme };
});
