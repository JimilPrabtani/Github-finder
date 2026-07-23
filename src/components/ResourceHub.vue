<template>
  <div class="resources-wrapper">
    <div class="resources-header">
      <h2 class="handwritten-heading">
        <i class="fas fa-paint-brush"></i> Developer & AI Learning Hub
        <span class="highlight-pink">Handpicked</span>
      </h2>
      <p class="handwritten-desc">
        Awesome free learning platforms, open-source projects, cybersecurity academies, and cutting-edge AI models!
      </p>

      <!-- Live Search & Category Filter -->
      <div class="resource-filter-controls">
        <div class="search-box sketch-border resource-search-box">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter resources by keyword (e.g. FullStack, Python, Security, AWS)..."
            autocomplete="off"
          />
        </div>
        <div class="res-tag-pills">
          <span
            v-for="cat in categories"
            :key="cat.id"
            :class="['res-tag-pill', { active: activeCategory === cat.id }]"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Category Blocks -->
    <div
      v-for="category in filteredCategories"
      :key="category.id"
      class="category-block"
    >
      <div :class="['category-title', category.badgeClass, 'sketch-border']">
        <i :class="category.icon"></i>
        <span>{{ category.title }}</span>
      </div>
      <div class="resources-grid">
        <ResourceCard
          v-for="(resource, i) in filterResources(category.resources)"
          :key="resource.url"
          :resource="resource"
          :tilt="i % 2 === 0 ? 'tilt-left' : 'tilt-right'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { resourceCategories } from "../data/resources.js";
import ResourceCard from "./ResourceCard.vue";

const searchQuery = ref("");
const activeCategory = ref("ALL");

const categories = [
  { id: "ALL", label: "#All" },
  { id: "DEV", label: "#FullStack & CS" },
  { id: "FEAT", label: "#16 Essential Repos" },
  { id: "AI", label: "#AI & LLMs" },
  { id: "SEC", label: "#Cybersecurity" },
  { id: "ENT", label: "#Enterprise Tech" },
];

const filteredCategories = computed(() => {
  if (activeCategory.value === "ALL") return resourceCategories;
  return resourceCategories.filter((c) => c.id === activeCategory.value);
});

function filterResources(resources) {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return resources;
  return resources.filter((r) =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    (r.tags || "").toLowerCase().includes(q)
  );
}
</script>

<style scoped>
.resources-wrapper {
  animation: handDrawnFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: 20px;
}
.resources-header {
  text-align: center; margin-bottom: 32px; padding-bottom: 20px;
  border-bottom: 2px dashed rgba(128,128,128,0.3);
}
.resource-filter-controls { margin-top: 20px; }
.resource-search-box { margin-bottom: 14px; }
.res-tag-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.res-tag-pill {
  font-family: 'Kalam', cursive; font-size: 0.95rem; font-weight: 700;
  padding: 4px 14px; background: var(--paper-card); color: var(--ink-black);
  border: 2px solid var(--ink-black); border-radius: 20px;
  cursor: pointer; transition: var(--transition-sketch);
  box-shadow: 2px 2px 0px var(--ink-black);
}
.res-tag-pill.active { background: var(--marker-yellow); transform: rotate(-1deg); }
.res-tag-pill:hover { transform: scale(1.05); }

.category-block { margin-bottom: 36px; }
.category-title {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 18px; border: var(--sketch-border); border-radius: var(--wobbly-radius);
  font-family: 'Kalam', cursive; font-size: 1.1rem; font-weight: 700;
  margin-bottom: 18px; box-shadow: 3px 3px 0px var(--ink-black); transform: rotate(-1deg);
}
.badge-featured { background: var(--marker-yellow); }
.badge-enterprise { background: #fed7aa; color: #7c2d12; }
.badge-ai { background: var(--marker-pink); }
.badge-security { background: var(--marker-cyan); }
.badge-dev { background: var(--marker-yellow); }
.resources-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px;
}

@media (max-width: 768px) { .resources-grid { grid-template-columns: 1fr; } }
</style>
