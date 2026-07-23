<template>
  <div ref="exportTarget" class="profile-header sketch-card">
    <div class="profile-action-btns">
      <ExportBadge :target-ref="exportTarget" :filename="user.login" />
      <button
        :class="['bookmark-btn', 'sketch-border', { bookmarked: userStore.isFavorite(user.login) }]"
        title="Bookmark User"
        @click="userStore.toggleFavorite(user)"
      >
        <i :class="userStore.isFavorite(user.login) ? 'fas fa-star text-yellow' : 'far fa-star'"></i>
      </button>
    </div>

    <div class="avatar-wrapper sketch-avatar">
      <img :src="user.avatar_url" :alt="`${user.login}'s avatar`" />
    </div>

    <div class="profile-info">
      <h2 class="handwritten-title">{{ user.name || user.login }}</h2>
      <p class="username">@{{ user.login }}</p>
      <div class="persona-badge highlight-yellow">
        <i class="fas fa-certificate"></i>
        <span>{{ persona }}</span>
      </div>
      <p class="handwritten-bio">{{ user.bio || "This profile has no bio" }}</p>

      <div class="location-date">
        <p><i class="fas fa-map-marker-alt"></i> {{ user.location || "Not Specified" }}</p>
        <p><i class="fas fa-calendar-alt"></i> Joined {{ formatDate(user.created_at) }}</p>
      </div>

      <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="sketch-button link-btn">
        <span>View GitHub Profile</span>
        <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/userStore.js";
import { formatDate } from "../utils/formatDate.js";
import { LANG_COLORS } from "../utils/langColors.js";
import ExportBadge from "./ExportBadge.vue";

const userStore = useUserStore();
const user = computed(() => userStore.currentUser);
const exportTarget = ref(null);

const persona = computed(() => {
  const repos = userStore.currentRepos;
  const langCounts = {};
  repos.forEach((r) => {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  });
  const topLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (topLang === "Python") return "🐍 Python Alchemist";
  if (topLang === "JavaScript" || topLang === "TypeScript") return "⚡ JS/TS Web Wizard";
  if (topLang === "Rust" || topLang === "C++" || topLang === "C") return "⚙️ Systems Architect";
  if (topLang === "HTML" || topLang === "CSS") return "🎨 Frontend Designer";
  if (topLang === "Go") return "🚀 Go Cloud Pioneer";
  if (topLang === "Java" || topLang === "C#") return "🏢 Enterprise Engineer";
  return "🛠️ Full-Stack Craftsman";
});
</script>

<style scoped>
.profile-header {
  display: flex; align-items: flex-start; gap: 28px;
  margin-bottom: 32px; padding: 28px; position: relative;
  animation: handDrawnFadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.profile-action-btns {
  position: absolute; top: 20px; right: 20px;
  display: flex; align-items: center; gap: 10px;
}
.bookmark-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--paper-card); font-size: 1.3rem;
  cursor: pointer; transition: var(--transition-sketch);
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-black);
}
.avatar-wrapper img {
  width: 120px; height: 120px; border-radius: 50%; object-fit: cover;
  border: var(--sketch-border); box-shadow: 4px 4px 0px var(--ink-black);
  transform: rotate(-2deg);
}
.profile-info { flex: 1; }
.username {
  font-family: 'Patrick Hand', cursive; font-size: 1.3rem;
  font-weight: 700; color: var(--primary-color);
}
.persona-badge {
  display: inline-flex; align-items: center; gap: 8px; margin-top: 6px;
  font-family: 'Kalam', cursive; font-size: 1rem; font-weight: 700;
  border: 2px solid var(--ink-black);
}
.location-date {
  display: flex; flex-wrap: wrap; gap: 20px; margin: 14px 0 20px 0;
  font-family: 'Patrick Hand', cursive; font-size: 1.1rem;
}
.location-date p {
  display: flex; align-items: center; gap: 8px; color: var(--ink-gray);
}
.link-btn { background: var(--marker-cyan); }

@media (max-width: 768px) {
  .profile-header { flex-direction: column; align-items: center; text-align: center; }
  .profile-action-btns { position: static; margin-bottom: 14px; justify-content: center; }
  .location-date { justify-content: center; }
}
</style>
