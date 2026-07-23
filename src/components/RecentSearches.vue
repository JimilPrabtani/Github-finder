<template>
  <div v-if="userStore.recentSearches.length > 0" class="recent-searches-wrapper">
    <span class="recent-label handwritten-desc"><i class="fas fa-history"></i> Recents:</span>
    <div class="recent-pills">
      <span
        v-for="username in userStore.recentSearches"
        :key="username"
        class="recent-pill"
        @click="emit('search', username)"
      >
        @{{ username }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore.js";

const emit = defineEmits(["search"]);
const userStore = useUserStore();
</script>

<style scoped>
.recent-searches-wrapper {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 16px; flex-wrap: wrap;
}
.recent-label { font-size: 1.05rem; color: var(--ink-gray); }
.recent-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.recent-pill {
  font-family: 'Patrick Hand', cursive; font-size: 1.05rem; font-weight: 700;
  padding: 3px 12px; background: var(--marker-yellow); color: var(--ink-black);
  border: 2px solid var(--ink-black); border-radius: 16px;
  cursor: pointer; transition: var(--transition-sketch);
}
.recent-pill:hover { transform: scale(1.05) rotate(-2deg); }
</style>
