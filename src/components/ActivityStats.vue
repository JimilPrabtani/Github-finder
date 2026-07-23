<template>
  <div class="activity-stats-section sketch-card">
    <h4 class="handwritten-heading"><i class="fas fa-chart-line"></i> Activity & Contribution Metrics</h4>
    <div class="activity-grid">
      <div class="act-stat-box">
        <span class="act-label">Account Age:</span>
        <strong>{{ accountAge }}</strong>
      </div>
      <div class="act-stat-box">
        <span class="act-label">Public Gists:</span>
        <strong>{{ user.public_gists ?? 0 }}</strong>
      </div>
      <div class="act-stat-box">
        <span class="act-label">Activity Level:</span>
        <strong class="highlight-pink">{{ activityRating }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ user: { type: Object, required: true } });

const accountAge = computed(() => {
  const created = new Date(props.user.created_at);
  const now = new Date();
  const days = Math.ceil(Math.abs(now - created) / (1000 * 60 * 60 * 24));
  const years = (days / 365.25).toFixed(1);
  return `${years} Yrs (${days} Days)`;
});

const activityRating = computed(() => {
  const u = props.user;
  if (u.public_repos > 40 || u.followers > 200) return "⚡ Hyper-Active Contributor";
  if (u.public_repos < 5 && u.followers < 10) return "🌱 Emerging Developer";
  return "🚀 Active Contributor";
});
</script>

<style scoped>
.activity-stats-section { padding: 24px; margin-bottom: 32px; }
.activity-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px; margin-top: 14px;
}
.act-stat-box {
  display: flex; flex-direction: column; padding: 12px 16px;
  background: rgba(128,128,128,0.08); border: 2px solid var(--ink-black);
  border-radius: 12px; font-family: 'Patrick Hand', cursive; font-size: 1.15rem;
}
</style>
