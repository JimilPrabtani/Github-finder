<template>
  <a
    :href="resource.url"
    target="_blank"
    rel="noopener noreferrer"
    :class="['resource-card', 'sketch-card', tilt, { 'highlight-yellow-card': resource.highlighted }]"
  >
    <div class="card-tape"></div>
    <div class="card-top">
      <i :class="[resource.icon, 'card-icon', resource.iconClass]"></i>
      <i class="fas fa-arrow-up-right-from-square link-arrow"></i>
    </div>
    <h4>{{ resource.title }}</h4>
    <p>{{ resource.description }}</p>
    <span :class="['card-tag', resource.tagClass]">{{ resource.tag }}</span>
  </a>
</template>

<script setup>
defineProps({
  resource: { type: Object, required: true },
  tilt: { type: String, default: "tilt-left" },
});
</script>

<style scoped>
.resource-card {
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 22px; text-decoration: none;
}
.card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.card-icon { font-size: 1.4rem; color: var(--ink-black); }
.feat-icon { color: var(--primary-color); }
.ent-icon { color: #ea580c; }
.ai-icon { color: #db2777; }
.sec-icon { color: #0284c7; }
.dev-icon { color: #7c3aed; }
.cert-icon { color: #16a34a; }
.ops-icon { color: #0d9488; }
.link-arrow { font-size: 0.95rem; color: var(--ink-gray); transition: var(--transition-sketch); }
.resource-card:hover .link-arrow { color: var(--ink-black); transform: translate(3px, -3px); }

.resource-card h4 {
  font-family: 'Kalam', cursive; font-size: 1.25rem; font-weight: 700;
  color: var(--ink-black); margin-bottom: 6px;
}
.resource-card p {
  font-family: 'Inter', sans-serif; font-size: 0.9rem;
  color: var(--ink-gray); line-height: 1.45; margin-bottom: 16px;
}
.card-tag {
  align-self: flex-start; font-family: 'Patrick Hand', cursive;
  font-size: 0.9rem; font-weight: 700; color: var(--ink-black);
  padding: 2px 10px; border: 2px solid var(--ink-black); border-radius: 12px;
}
.tag-pink { background: var(--marker-pink); }
.tag-yellow { background: var(--marker-yellow); }
.tag-cyan { background: var(--marker-cyan); }

.highlight-yellow-card { background: #fef9c3 !important; border-color: #ca8a04 !important; }
:root[data-theme="dark"] .highlight-yellow-card { background: #2e2609 !important; border-color: #eab308 !important; }
</style>
