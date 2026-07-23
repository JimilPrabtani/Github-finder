<template>
  <button class="sketch-button btn-small" @click="themeStore.toggleTheme()">
    <i :class="themeStore.isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
    <span>{{ themeStore.isDark ? 'Light Sketch' : 'Dark Notebook' }}</span>
  </button>
</template>

<script setup>
import { useThemeStore } from "../stores/themeStore.js";
const themeStore = useThemeStore();
</script>
