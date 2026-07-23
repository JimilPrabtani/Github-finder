<template>
  <div class="container sketch-card main-container">
    <div class="tape-strip tape-top-left"></div>
    <div class="tape-strip tape-top-right"></div>

    <!-- Top Utility Bar -->
    <div class="top-utility-bar">
      <ThemeToggle />
      <button class="sketch-button btn-small" @click="showFavModal = true">
        <i class="fas fa-star text-yellow"></i>
        <span>Bookmarks ({{ userStore.favCount }})</span>
      </button>
    </div>

    <!-- Header -->
    <header>
      <div class="logo-badge sketch-border">
        <i class="fab fa-github"></i>
      </div>
      <h1 class="handwritten-title">Gitfind - GitHub User Finder <span class="doodle-sparkle">✨</span></h1>
      <p class="handwritten-subtitle">
        Search developers, duel profiles, explore open-source projects, and discover
        <span class="highlight-yellow">AI & Tech hubs</span>!
      </p>

      <!-- Mode Tabs -->
      <div class="mode-tabs">
        <button :class="['mode-tab', 'sketch-border', { active: mode === 'single' }]" @click="mode = 'single'">
          <i class="fas fa-user"></i> Single Search
        </button>
        <button :class="['mode-tab', 'sketch-border', { active: mode === 'duel' }]" @click="mode = 'duel'">
          ⚔️ Profile Duel
        </button>
      </div>
    </header>

    <!-- Single Search Mode -->
    <template v-if="mode === 'single'">
      <SearchBar @search="handleSearch" />
      <RecentSearches @search="handleSearch" />

      <!-- Profile Results -->
      <template v-if="userStore.currentUser">
        <ProfileCard />
        <LanguageBreakdown :repos="userStore.currentRepos" />
        <ActivityStats :user="userStore.currentUser" />
        <StatCards :user="userStore.currentUser" />
        <RepoList :repos="userStore.currentRepos" />
      </template>

      <!-- Error State -->
      <div v-else-if="userStore.errorMsg" class="error-content sketch-border">
        <i class="fas fa-ghost error-icon"></i>
        <p class="handwritten-desc">{{ userStore.errorMsg }}</p>
      </div>

      <!-- Default Resource Hub (shown when no user searched) -->
      <ResourceHub v-else />
    </template>

    <!-- Duel Mode -->
    <template v-else>
      <DuelMode />
    </template>

    <!-- Footer -->
    <footer class="app-footer">
      <p class="handwritten-desc">
        Developed with ❤️ by <strong>Jimil Prabtani</strong> |
        <a
          href="https://github.com/JimilPrabtani/Github-finder/tree/master"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-link"
        >
          <i class="fab fa-github"></i> GitHub Repository
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useUserStore } from "../stores/userStore.js";
import { useGithubApi } from "../composables/useGithubApi.js";
import ThemeToggle from "../components/ThemeToggle.vue";
import SearchBar from "../components/SearchBar.vue";
import RecentSearches from "../components/RecentSearches.vue";
import ProfileCard from "../components/ProfileCard.vue";
import LanguageBreakdown from "../components/LanguageBreakdown.vue";
import ActivityStats from "../components/ActivityStats.vue";
import StatCards from "../components/StatCards.vue";
import RepoList from "../components/RepoList.vue";
import ResourceHub from "../components/ResourceHub.vue";
import DuelMode from "../components/DuelMode.vue";

const userStore = useUserStore();
const { fetchUser, fetchRepos } = useGithubApi();
const showFavModal = inject("showFavModal");
const mode = ref("single");

async function handleSearch(username) {
  if (!username.trim()) return;
  userStore.isLoading = true;
  userStore.errorMsg = "";

  try {
    const userData = await fetchUser(username);
    userStore.currentUser = userData;
    userStore.addRecentSearch(userData.login);

    const reposData = await fetchRepos(userData.login);
    userStore.currentRepos = reposData;
  } catch (err) {
    userStore.currentUser = null;
    userStore.currentRepos = [];
    userStore.errorMsg = "Oops! No GitHub user found. Double check the spelling!";
  } finally {
    userStore.isLoading = false;
  }
}
</script>

<style scoped>
.logo-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px;
  background: var(--marker-yellow);
  border: var(--sketch-border); border-radius: var(--wobbly-radius);
  box-shadow: var(--sketch-shadow);
  font-size: 2rem; color: var(--ink-black);
  margin-bottom: 16px; transform: rotate(-3deg);
}

header { text-align: center; margin-bottom: 32px; }

.top-utility-bar {
  display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 12px;
}

.mode-tabs { display: inline-flex; gap: 12px; margin-top: 18px; }

.mode-tab {
  font-family: 'Kalam', cursive; font-size: 1.1rem; font-weight: 700;
  padding: 8px 20px; background: var(--paper-card); color: var(--ink-black);
  border: var(--sketch-border); border-radius: var(--wobbly-radius);
  cursor: pointer; transition: var(--transition-sketch);
  box-shadow: 2px 3px 0px var(--ink-black);
}
.mode-tab.active {
  background: var(--marker-yellow);
  box-shadow: 4px 4px 0px var(--ink-black);
  transform: rotate(-1deg);
}

.main-container {
  width: 100%; max-width: 880px; padding: 44px; z-index: 1;
}

.app-footer {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 2px dashed rgba(128, 128, 128, 0.3);
  text-align: center;
}

.footer-link {
  color: var(--primary-color);
  font-weight: 700;
  text-decoration: none;
  transition: var(--transition-sketch);
}

.footer-link:hover {
  text-decoration: underline;
  background: var(--marker-yellow);
  padding: 2px 6px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .main-container { padding: 28px 18px; }
}
</style>
