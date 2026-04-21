<script setup>
import {
  PhArchiveBox,
  PhChartPieSlice,
  PhGridFour,
  PhPackage,
  PhShapes,
} from '@phosphor-icons/vue';

defineProps({
  activeTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['navigate']);

const items = [
  { id: 'dashboard', label: 'Дашборд', icon: PhChartPieSlice },
  { id: 'products', label: 'Товары', icon: PhPackage },
  { id: 'cells', label: 'Ячейки', icon: PhGridFour },
  { id: 'categories', label: 'Категории', icon: PhShapes },
];
</script>

<template>
  <aside
    class="glass-panel pattern-grid relative overflow-hidden rounded-[28px] p-5 text-white md:min-h-[calc(100vh-2rem)] md:w-64 md:p-6"
    style="background-color: rgba(19, 34, 38, 0.92)"
  >
    <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-teal-400/20 via-amber-300/10 to-transparent"></div>
    <div class="relative flex h-full flex-col gap-6">
      <div>
        <div class="flex items-center gap-3">
          <div class="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
            <PhArchiveBox :size="28" weight="duotone" />
          </div>
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-white/55">simple</p>
            <h1 class="text-2xl font-semibold">WMS</h1>
          </div>
        </div>
        <p class="mt-4 max-w-xs text-sm leading-6 text-white/65">
          Учебная система управления складом, работающая полностью в браузере.
        </p>
      </div>

      <nav class="grid gap-2">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          :class="
            activeTab === item.id
              ? 'bg-white text-slate-900 shadow-lg'
              : 'text-white/80'
          "
          @click="emit('navigate', item.id)"
        >
          <component :is="item.icon" :size="22" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <div class="mt-auto rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
        <p class="text-xs uppercase tracking-[0.3em] text-white/50">режим</p>
        <p class="mt-2 text-lg font-semibold">LocalStorage Demo</p>
        <p class="mt-2 text-sm leading-6 text-white/65">
          Без сервера, без базы данных и без перезагрузки страницы.
        </p>
      </div>
    </div>
  </aside>
</template>
