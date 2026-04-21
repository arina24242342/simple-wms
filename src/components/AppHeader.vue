<script setup>
import {
  PhArrowClockwise,
  PhDatabase,
  PhMagnifyingGlass,
} from '@phosphor-icons/vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  productCount: {
    type: Number,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:searchQuery', 'reset']);
</script>

<template>
  <header class="glass-panel rounded-[28px] p-5 md:p-6">
    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-[color:var(--color-ink-soft)]">
          warehouse control
        </p>
        <div class="mt-2 flex flex-wrap items-center gap-3">
          <h2 class="text-3xl font-semibold text-[color:var(--color-ink)]">
            {{ title }}
          </h2>
          <span
            class="rounded-full bg-[color:var(--color-accent-soft)] px-3 py-1 text-sm font-medium text-[color:var(--color-accent)]"
          >
            {{ productCount }} товаров в системе
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:items-center">
        <label
          v-if="activeTab === 'products'"
          class="soft-card flex min-w-[260px] items-center gap-3 rounded-2xl px-4 py-3"
        >
          <PhMagnifyingGlass :size="18" class="text-[color:var(--color-ink-soft)]" />
          <input
            :value="searchQuery"
            type="search"
            placeholder="Поиск по товару, категории или ячейке"
            class="w-full border-none bg-transparent outline-none"
            @input="emit('update:searchQuery', $event.target.value)"
          />
        </label>

        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-ink)] px-4 py-3 font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent)]"
          @click="emit('reset')"
        >
          <PhArrowClockwise :size="18" />
          Сбросить демо-данные
        </button>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-3 text-sm text-[color:var(--color-ink-soft)]">
      <div class="soft-card rounded-2xl px-4 py-3">
        <span class="mr-2 inline-flex align-middle"><PhDatabase :size="16" /></span>
        Хранение данных: LocalStorage
      </div>
      <div class="soft-card rounded-2xl px-4 py-3">
        Изменения сохраняются автоматически и синхронно
      </div>
    </div>
  </header>
</template>
