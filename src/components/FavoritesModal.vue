<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-card sketch-card">
      <div class="modal-header">
        <h3 class="handwritten-title"><i class="fas fa-star text-yellow"></i> Saved Favorites</h3>
        <button class="close-btn" @click="emit('close')">&times;</button>
      </div>
      <div class="fav-list">
        <p v-if="userStore.favorites.length === 0" class="handwritten-desc empty-msg">
          No saved profiles yet. Click the ⭐ icon on any user to bookmark them!
        </p>
        <div v-for="u in userStore.favorites" :key="u.login" class="fav-item">
          <div class="fav-user-info">
            <img :src="u.avatar_url" class="fav-avatar" />
            <div>
              <strong>{{ u.name }}</strong>
              <p class="handwritten-desc" style="font-size:0.95rem;">@{{ u.login }}</p>
            </div>
          </div>
          <div class="fav-actions">
            <button class="sketch-button btn-small" @click="launchUser(u.login)">View</button>
            <i class="fas fa-trash remove-fav-btn" @click="userStore.removeFavorite(u.login)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore.js";
import { useGithubApi } from "../composables/useGithubApi.js";

const emit = defineEmits(["close"]);
const userStore = useUserStore();
const { fetchUser, fetchRepos } = useGithubApi();

async function launchUser(login) {
  emit("close");
  try {
    const userData = await fetchUser(login);
    userStore.currentUser = userData;
    userStore.addRecentSearch(login);
    const reposData = await fetchRepos(login);
    userStore.currentRepos = reposData;
  } catch {
    userStore.errorMsg = "Failed to load bookmarked user.";
  }
}
</script>

<style scoped>
.fav-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; background: rgba(254,240,138,0.25);
  border: 2px solid var(--ink-black); border-radius: 12px; margin-bottom: 10px;
}
.fav-user-info { display: flex; align-items: center; gap: 12px; }
.fav-avatar { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--ink-black); }
.fav-actions { display: flex; align-items: center; gap: 10px; }
.remove-fav-btn { color: #ef4444; cursor: pointer; font-size: 1.1rem; }
</style>
