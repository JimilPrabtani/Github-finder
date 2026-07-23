<template>
  <div class="search-container">
    <div class="search-box sketch-border">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="query"
        type="text"
        placeholder="Type a GitHub username (e.g. octocat)..."
        autocomplete="off"
        @keypress.enter="emitSearch"
      />
      <button class="sketch-button" @click="emitSearch">
        <span>Search!</span>
        <i class="fas fa-pencil-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);
const query = ref("");

function emitSearch() {
  if (query.value.trim()) {
    emit("search", query.value.trim());
  }
}

// Expose query for external reuse (e.g. recent search click sets query)
defineExpose({ query });
</script>

<style scoped>
.search-container { margin-bottom: 16px; }
</style>
