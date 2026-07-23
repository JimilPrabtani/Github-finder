<template>
  <button class="sketch-button btn-small" title="Export Profile Badge as Image" @click="exportBadge">
    <i :class="exporting ? 'fas fa-spinner fa-spin' : 'fas fa-camera'"></i>
    <span>{{ exporting ? 'Exporting...' : 'Export Badge' }}</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import html2canvas from "html2canvas";

const props = defineProps({
  targetRef: { type: Object, default: null },
  filename: { type: String, default: "github_badge" },
});

const exporting = ref(false);

async function exportBadge() {
  if (!props.targetRef) return;
  exporting.value = true;

  try {
    const canvas = await html2canvas(props.targetRef, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const link = document.createElement("a");
    link.download = `${props.filename}_sketch_badge.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch {
    alert("Failed to generate image.");
  } finally {
    exporting.value = false;
  }
}
</script>
