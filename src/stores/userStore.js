// User Store — Pinia store for profile, repos, favorites, and recent searches
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // Current searched user
  const currentUser = ref(null);
  const currentRepos = ref([]);
  const isLoading = ref(false);
  const errorMsg = ref("");

  // Recent searches (localStorage)
  const recentSearches = ref(JSON.parse(localStorage.getItem("recent_searches") || "[]"));

  // Favorites (localStorage)
  const favorites = ref(JSON.parse(localStorage.getItem("fav_users") || "[]"));
  const favCount = computed(() => favorites.value.length);

  function addRecentSearch(username) {
    let recents = recentSearches.value.filter(
      (n) => n.toLowerCase() !== username.toLowerCase()
    );
    recents.unshift(username);
    recents = recents.slice(0, 5);
    recentSearches.value = recents;
    localStorage.setItem("recent_searches", JSON.stringify(recents));
  }

  function isFavorite(login) {
    return favorites.value.some((u) => u.login === login);
  }

  function toggleFavorite(user) {
    if (isFavorite(user.login)) {
      favorites.value = favorites.value.filter((u) => u.login !== user.login);
    } else {
      favorites.value.push({
        login: user.login,
        name: user.name || user.login,
        avatar_url: user.avatar_url,
      });
    }
    localStorage.setItem("fav_users", JSON.stringify(favorites.value));
  }

  function removeFavorite(login) {
    favorites.value = favorites.value.filter((u) => u.login !== login);
    localStorage.setItem("fav_users", JSON.stringify(favorites.value));
  }

  function clearUser() {
    currentUser.value = null;
    currentRepos.value = [];
    errorMsg.value = "";
  }

  return {
    currentUser,
    currentRepos,
    isLoading,
    errorMsg,
    recentSearches,
    favorites,
    favCount,
    addRecentSearch,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearUser,
  };
});
