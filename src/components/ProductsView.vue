<script setup>
import { PhPlus, PhTrash } from '@phosphor-icons/vue';

defineProps({
  products: {
    type: Array,
    required: true,
  },
  getCategoryName: {
    type: Function,
    required: true,
  },
  getCellName: {
    type: Function,
    required: true,
  },
  getProductImage: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['create', 'delete']);
</script>

<template>
  <section class="grid gap-5">
    <div class="flex flex-col gap-4 rounded-[28px] border border-dashed border-black/10 bg-white/50 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
          управление номенклатурой
        </p>
        <h3 class="mt-2 text-2xl font-semibold">Список товаров</h3>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--color-ink-soft)]">
          Поиск работает по названию товара, категории и ячейке. Добавление новых позиций выполняется в модальном окне.
        </p>
      </div>

      <button
        type="button"
        class="flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-ink)]"
        @click="emit('create')"
      >
        <PhPlus :size="18" />
        Добавить товар
      </button>
    </div>

    <div v-if="products.length" class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      <article
        v-for="product in products"
        :key="product.id"
        class="soft-card rounded-[28px] p-4"
      >
        <img
          :src="getProductImage(product.image)"
          :alt="product.name"
          class="h-48 w-full rounded-[22px] object-cover"
        />
        <div class="mt-4 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h4 class="text-lg font-semibold text-[color:var(--color-ink)]">
              {{ product.name }}
            </h4>
            <p class="mt-2 text-sm leading-6 text-[color:var(--color-ink-soft)]">
              {{ getCategoryName(product.categoryId) }}
            </p>
            <p class="text-sm leading-6 text-[color:var(--color-ink-soft)]">
              {{ getCellName(product.cellId) }}
            </p>
          </div>
          <div class="rounded-[22px] bg-slate-950 px-3 py-2 text-right text-white">
            <p class="text-xs uppercase tracking-[0.25em] text-white/50">остаток</p>
            <p class="mt-1 text-2xl font-semibold">{{ product.quantity }}</p>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-between gap-3">
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            ID {{ product.id }}
          </span>
          <button
            type="button"
            class="flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 font-medium text-rose-600 transition hover:bg-rose-50"
            @click="emit('delete', product.id)"
          >
            <PhTrash :size="16" />
            Удалить
          </button>
        </div>
      </article>
    </div>

    <div
      v-else
      class="soft-card rounded-[28px] p-10 text-center text-[color:var(--color-ink-soft)]"
    >
      По текущему запросу товары не найдены.
    </div>
  </section>
</template>
