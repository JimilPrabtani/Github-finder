<template>
  <div class="search-container">
    <div class="search-box sketch-border">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="query"
        type="text"
        placeholder="Type a GitHub username (e.g. octocat)..."
        autocomplete="off"
        :disabled="loading"
        @keypress.enter="emitSearch"
      />
      <button class="sketch-button" :disabled="loading" @click="emitSearch">
        <span>{{ loading ? 'Searching...' : 'Search!' }}</span>
        <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-pencil-alt'"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  loading: { type: Boolean, default: false },
});

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
