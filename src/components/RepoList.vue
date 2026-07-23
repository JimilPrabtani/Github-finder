<template>
  <div class="repo-section">
    <div class="repo-section-header">
      <h3 class="handwritten-heading"><i class="fas fa-folder-open"></i> Latest Repositories</h3>
      <div class="repo-controls">
        <select v-model="filterLang" class="sketch-select">
          <option value="ALL">All Languages</option>
          <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
        </select>
        <select v-model="sortBy" class="sketch-select">
          <option value="updated">Recently Updated 🕒</option>
          <option value="stars">Most Stars ⭐</option>
          <option value="forks">Most Forks 🍴</option>
        </select>
      </div>
    </div>

    <div class="repos-container">
      <div v-if="sortedRepos.length === 0" class="no-repos handwritten-desc">
        No repositories match your filter
      </div>
      <div
        v-for="(repo, i) in sortedRepos"
        :key="repo.id"
        :class="['repo-card', 'sketch-card', i % 2 === 0 ? 'tilt-left' : 'tilt-right']"
      >
        <div class="card-tape"></div>
        <div class="repo-header">
          <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="repo-name">
            <i class="fas fa-code-branch"></i> {{ repo.name }}
          </a>
          <p class="repo-description">{{ repo.description || "No description available" }}</p>
        </div>
        <div class="repo-meta">
          <div v-if="repo.language" class="repo-meta-item">
            <i class="fas fa-circle" :style="{ color: langColor(repo.language) }"></i>
            {{ repo.language }}
          </div>
          <div class="repo-meta-item">
            <i class="fas fa-star" style="color: #f59e0b"></i> {{ repo.stargazers_count }}
          </div>
          <div class="repo-meta-item">
            <i class="fas fa-code-fork" style="color: #3b82f6"></i> {{ repo.forks_count }}
          </div>
          <div class="repo-meta-item">
            <i class="fas fa-clock"></i> {{ formatDate(repo.updated_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { LANG_COLORS } from "../utils/langColors.js";
import { formatDate } from "../utils/formatDate.js";

const props = defineProps({ repos: { type: Array, default: () => [] } });

const filterLang = ref("ALL");
const sortBy = ref("updated");

const languages = computed(() => {
  const langs = new Set();
  props.repos.forEach((r) => { if (r.language) langs.add(r.language); });
  return [...langs].sort();
});

const sortedRepos = computed(() => {
  let filtered = props.repos.filter((r) =>
    filterLang.value === "ALL" ? true : r.language === filterLang.value
  );
  if (sortBy.value === "stars") filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
  else if (sortBy.value === "forks") filtered.sort((a, b) => b.forks_count - a.forks_count);
  else filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  return filtered;
});

function langColor(lang) { return LANG_COLORS[lang] || "#8b5cf6"; }
</script>

<style scoped>
.repo-section-header {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 14px; margin-bottom: 20px;
}
.repo-controls { display: flex; gap: 10px; }
.repos-container {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;
}
.repo-card { display: flex; flex-direction: column; justify-content: space-between; padding: 22px; }
.repo-name {
  font-family: 'Kalam', cursive; font-size: 1.3rem; font-weight: 700;
  color: var(--primary-color); text-decoration: none;
  display: inline-flex; align-items: center; gap: 8px;
}
.repo-description {
  font-family: 'Inter', sans-serif; color: var(--ink-gray);
  font-size: 0.92rem; margin-top: 8px; line-height: 1.5;
}
.repo-meta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
  margin-top: 18px; padding-top: 14px;
  border-top: 2px dashed rgba(128,128,128,0.3);
  font-family: 'Patrick Hand', cursive; font-size: 1rem; color: var(--ink-gray);
}
.repo-meta-item { display: flex; align-items: center; gap: 6px; }
.no-repos { text-align: center; padding: 36px; grid-column: 1 / -1; font-size: 1.3rem; }

@media (max-width: 768px) { .repos-container { grid-template-columns: 1fr; } }
</style>
