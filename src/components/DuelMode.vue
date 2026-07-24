<template>
  <!-- Duel Search Inputs -->
  <div class="duel-search-wrapper">
    <div class="duel-input-grid">
      <div class="search-box sketch-border">
        <i class="fas fa-user search-icon"></i>
        <input v-model="user1" type="text" placeholder="User A (e.g. octocat)" autocomplete="off" @keypress.enter="executeDuel" />
      </div>
      <div class="duel-vs-badge">VS</div>
      <div class="search-box sketch-border">
        <i class="fas fa-user search-icon"></i>
        <input v-model="user2" type="text" placeholder="User B (e.g. torvalds)" autocomplete="off" @keypress.enter="executeDuel" />
      </div>
    </div>
    <button class="sketch-button btn-block" :disabled="loading" @click="executeDuel">
      <span>{{ loading ? '⚔️ Fighting Battle...' : '⚔️ Start GitHub Duel!' }}</span>
    </button>
  </div>

  <!-- Duel Results -->
  <div v-if="duelResult" class="duel-results-wrapper">
    <div class="duel-winner-banner sketch-card">
      <i class="fas fa-trophy trophy-icon"></i>
      <h3 class="handwritten-title" v-html="sanitizeHtml(winnerText)"></h3>
    </div>
    <div class="duel-cards-grid">
      <div v-for="(u, idx) in [duelResult.user1, duelResult.user2]" :key="u.login"
        :class="['duel-card', 'sketch-card', { 'highlight-yellow': scores[idx] >= scores[1 - idx] }]">
        <img :src="u.avatar_url" class="duel-avatar" />
        <h3 class="handwritten-title">{{ u.name || u.login }}</h3>
        <p class="handwritten-desc">@{{ u.login }}</p>
        <hr class="duel-hr" />
        <div class="duel-stat-row"><span>Duel Score:</span> <strong>{{ scores[idx] }} pts</strong></div>
        <div class="duel-stat-row"><span>Followers:</span> <strong>{{ u.followers }}</strong></div>
        <div class="duel-stat-row"><span>Repositories:</span> <strong>{{ u.public_repos }}</strong></div>
        <div class="duel-stat-row"><span>Following:</span> <strong>{{ u.following }}</strong></div>
      </div>
    </div>
  </div>

  <!-- Error -->
  <div v-if="errorMsg" class="error-content sketch-border" style="margin-top:20px;">
    <i class="fas fa-ghost error-icon"></i>
    <p class="handwritten-desc">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import DOMPurify from 'dompurify';
import { ref, computed } from "vue";
import { useGithubApi } from "../composables/useGithubApi.js";

const { fetchDuel } = useGithubApi();

const user1 = ref("");
const user2 = ref("");
const loading = ref(false);
const duelResult = ref(null);
const errorMsg = ref("");

function calcScore(u) {
  const ageYears = new Date().getFullYear() - new Date(u.created_at).getFullYear();
  return (u.followers || 0) * 3 + (u.public_repos || 0) * 2 + (u.following || 0) + ageYears * 5;
}

const scores = computed(() => {
  if (!duelResult.value) return [0, 0];
  return [calcScore(duelResult.value.user1), calcScore(duelResult.value.user2)];
});

const winnerText = computed(() => {
  if (!duelResult.value) return "";
  const [s1, s2] = scores.value;
  if (s1 > s2) return `🏆 Champion: <span class="highlight-pink">${duelResult.value.user1.login}</span> Wins!`;
  if (s2 > s1) return `🏆 Champion: <span class="highlight-pink">${duelResult.value.user2.login}</span> Wins!`;
  return `🤝 It's a Tie Battle!`;
});

async function executeDuel() {
  if (!user1.value.trim() || !user2.value.trim()) {
    errorMsg.value = "Please enter two GitHub usernames to duel!";
    return;
  }
  loading.value = true;
  errorMsg.value = "";
  duelResult.value = null;

  try {
    duelResult.value = await fetchDuel(user1.value.trim(), user2.value.trim());
  } catch (err) {
    errorMsg.value = err.message || "One or both users not found!";
  } finally {
    loading.value = false;
  }
}

function sanitizeHtml(html) {
  return html
    ? DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['span', 'p'],
        ALLOWED_ATTR: ['class'],
      })
    : '';
}
</script>

<style scoped>
.duel-search-wrapper { margin-bottom: 32px; }
.duel-input-grid {
  display: grid; grid-template-columns: 1fr auto 1fr;
  gap: 14px; align-items: center; margin-bottom: 16px;
}
.duel-vs-badge {
  font-family: 'Caveat', cursive; font-size: 2rem;
  font-weight: 700; color: var(--primary-color);
}
.duel-results-wrapper { margin-bottom: 36px; }
.duel-winner-banner { text-align: center; padding: 20px; background: var(--marker-yellow); margin-bottom: 24px; }
.trophy-icon { font-size: 2.5rem; color: #d97706; margin-bottom: 6px; }
.duel-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.duel-card { padding: 24px; text-align: center; }
.duel-avatar { width: 90px; height: 90px; border-radius: 50%; border: var(--sketch-border); margin-bottom: 12px; }
.duel-hr { margin: 12px 0; border: 1px dashed rgba(128,128,128,0.3); }
.duel-stat-row {
  display: flex; justify-content: space-between; padding: 8px 0;
  border-bottom: 1px dashed rgba(128,128,128,0.3);
  font-family: 'Patrick Hand', cursive; font-size: 1.1rem;
}

@media (max-width: 768px) {
  .duel-input-grid { grid-template-columns: 1fr; }
  .duel-cards-grid { grid-template-columns: 1fr; }
}
</style>
