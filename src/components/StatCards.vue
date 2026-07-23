<template>
  <div class="stats">
    <div class="stat-card sketch-card tilt-left">
      <div class="stat-icon"><i class="fas fa-users"></i></div>
      <div class="stat-details">
        <span class="stat-num">{{ user.followers ?? 0 }}</span>
        <span class="stat-label">Followers</span>
      </div>
    </div>
    <div class="stat-card sketch-card tilt-right">
      <div class="stat-icon"><i class="fas fa-user-plus"></i></div>
      <div class="stat-details">
        <span class="stat-num">{{ user.following ?? 0 }}</span>
        <span class="stat-label">Following</span>
      </div>
    </div>
    <div class="stat-card sketch-card tilt-left">
      <div class="stat-icon"><i class="fas fa-code-branch"></i></div>
      <div class="stat-details">
        <span class="stat-num">{{ user.public_repos ?? 0 }}</span>
        <span class="stat-label">Repositories</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ user: { type: Object, required: true } });
</script>

<style scoped>
.stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 18px; margin-bottom: 32px;
}
.stat-card {
  display: flex; align-items: center; gap: 16px; padding: 18px 20px;
}
.stat-icon {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; background: var(--marker-yellow);
  border: 2px solid var(--ink-black); border-radius: 12px;
  font-size: 1.3rem; color: var(--ink-black);
}
.stat-num {
  font-family: 'Kalam', cursive; font-size: 1.6rem;
  font-weight: 700; color: var(--ink-black); line-height: 1;
}
.stat-label {
  font-family: 'Patrick Hand', cursive; font-size: 1rem; color: var(--ink-gray);
}

@media (max-width: 768px) { .stats { grid-template-columns: 1fr; } }
</style>
