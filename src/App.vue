<template>
  <div class="sketch-grid"></div>
  <div class="doodle doodle-star-1">★</div>
  <div class="doodle doodle-star-2">✦</div>
  <div class="doodle doodle-circle-1"></div>
  <div class="doodle doodle-squiggle-1">〰️</div>

  <router-view />

  <!-- Favorites Modal -->
  <FavoritesModal v-if="showFavModal" @close="showFavModal = false" />
</template>

<script setup>
import { ref, provide } from "vue";
import FavoritesModal from "./components/FavoritesModal.vue";

const showFavModal = ref(false);

provide("showFavModal", showFavModal);
</script>
