<script setup>
import { PhFolderOpen, PhPlus, PhStack, PhTrash } from '@phosphor-icons/vue';

defineProps({
  categories: {
    type: Array,
    required: true,
  },
  distribution: {
    type: Array,
    required: true,
  },
  newCategoryName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:newCategoryName', 'submit', 'delete']);
</script>

<template>
  <section class="grid gap-5 xl:grid-cols-[0.8fr,1.2fr]">
    <article class="soft-card rounded-[28px] p-5 md:p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
            справочник
          </p>
          <h3 class="mt-2 text-2xl font-semibold">Новая категория</h3>
        </div>
        <div class="rounded-2xl bg-teal-100 p-3 text-teal-700">
          <PhFolderOpen :size="22" />
        </div>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="emit('submit')">
        <label class="grid gap-2">
          <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Название категории</span>
          <input
            :value="newCategoryName"
            type="text"
            placeholder="Например, расходные материалы"
            class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
            @input="emit('update:newCategoryName', $event.target.value)"
          />
        </label>

        <button
          type="submit"
          class="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-ink)]"
        >
          <PhPlus :size="18" />
          Добавить категорию
        </button>
      </form>
    </article>

    <article class="soft-card rounded-[28px] p-5 md:p-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
            справочник категорий
          </p>
          <h3 class="mt-2 text-2xl font-semibold">Текущие категории</h3>
        </div>
        <div class="rounded-2xl bg-amber-100 p-3 text-amber-700">
          <PhStack :size="22" />
        </div>
      </div>

      <div class="mt-6 grid gap-3">
        <div
          v-for="category in distribution"
          :key="category.id"
          class="rounded-[24px] border border-black/[0.06] bg-white/85 p-4"
        >
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="text-lg font-semibold text-[color:var(--color-ink)]">{{ category.name }}</p>
              <p class="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                {{ category.productsCount }} товаров · {{ category.quantity }} единиц
              </p>
            </div>

            <button
              type="button"
              class="flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 font-medium text-rose-600 transition hover:bg-rose-50"
              @click="emit('delete', category.id)"
            >
              <PhTrash :size="16" />
              Удалить
            </button>
          </div>
        </div>
      </div>

      <p v-if="!categories.length" class="mt-6 text-sm text-[color:var(--color-ink-soft)]">
        Категории ещё не созданы.
      </p>
    </article>
  </section>
</template>
