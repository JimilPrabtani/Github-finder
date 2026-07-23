<template>
  <div class="language-section sketch-card">
    <h4 class="handwritten-heading"><i class="fas fa-chart-pie"></i> Top Programming Languages</h4>
    <div class="lang-bar-container">
      <div
        v-for="item in topLangs"
        :key="item.lang"
        class="lang-segment"
        :style="{ width: item.pct + '%', backgroundColor: item.color }"
        :title="`${item.lang}: ${item.pct}%`"
      ></div>
    </div>
    <div class="lang-legend">
      <div v-for="item in topLangs" :key="item.lang" class="lang-legend-item">
        <span class="lang-dot" :style="{ backgroundColor: item.color }"></span>
        <span>{{ item.lang }} <strong>{{ item.pct }}%</strong></span>
      </div>
      <span v-if="topLangs.length === 0">No language data available</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { LANG_COLORS } from "../utils/langColors.js";

const props = defineProps({ repos: { type: Array, default: () => [] } });

const topLangs = computed(() => {
  const counts = {};
  let total = 0;
  props.repos.forEach((r) => {
    if (r.language) { counts[r.language] = (counts[r.language] || 0) + 1; total++; }
  });
  return Object.entries(counts)
    .map(([lang, count]) => ({ lang, count, pct: Math.round((count / total) * 100), color: LANG_COLORS[lang] || "#8b5cf6" }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
});
</script>

<style scoped>
.language-section { padding: 24px; margin-bottom: 32px; }
.lang-bar-container {
  display: flex; height: 18px; border-radius: 10px; overflow: hidden;
  border: 2px solid var(--ink-black); margin: 14px 0 16px 0; background: #e5e7eb;
}
.lang-segment { height: 100%; transition: width 0.5s ease; }
.lang-legend {
  display: flex; flex-wrap: wrap; gap: 16px;
  font-family: 'Patrick Hand', cursive; font-size: 1.05rem;
}
.lang-legend-item { display: flex; align-items: center; gap: 6px; }
.lang-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--ink-black); }
</style>
