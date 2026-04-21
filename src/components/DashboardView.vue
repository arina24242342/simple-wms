<script setup>
import {
  PhArchiveTray,
  PhArmchair,
  PhChartDonut,
  PhGridFour,
  PhPackage,
} from '@phosphor-icons/vue';

defineProps({
  categoriesCount: {
    type: Number,
    required: true,
  },
  cellsCount: {
    type: Number,
    required: true,
  },
  occupiedCellsCount: {
    type: Number,
    required: true,
  },
  freeCellsCount: {
    type: Number,
    required: true,
  },
  productsCount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  recentProducts: {
    type: Array,
    required: true,
  },
  categoryDistribution: {
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

const stats = [
  {
    key: 'products',
    label: 'SKU в системе',
    valueKey: 'productsCount',
    icon: PhPackage,
    tone: 'bg-teal-100 text-teal-700',
  },
  {
    key: 'quantity',
    label: 'Суммарный остаток',
    valueKey: 'totalQuantity',
    icon: PhArchiveTray,
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    key: 'cells',
    label: 'Свободные ячейки',
    valueKey: 'freeCellsCount',
    icon: PhGridFour,
    tone: 'bg-emerald-100 text-emerald-700',
  },
  {
    key: 'categories',
    label: 'Категории',
    valueKey: 'categoriesCount',
    icon: PhArmchair,
    tone: 'bg-sky-100 text-sky-700',
  },
];
</script>

<template>
  <section class="grid gap-5">
    <div class="grid gap-4 xl:grid-cols-4">
      <article
        v-for="(stat, index) in stats"
        :key="stat.key"
        class="soft-card stagger-in rounded-[26px] p-5"
        :style="{ animationDelay: `${index * 80}ms` }"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm text-[color:var(--color-ink-soft)]">{{ stat.label }}</p>
            <p class="mt-3 text-4xl font-semibold text-[color:var(--color-ink)]">
              {{ $props[stat.valueKey] }}
            </p>
          </div>
          <div class="rounded-2xl p-3" :class="stat.tone">
            <component :is="stat.icon" :size="22" />
          </div>
        </div>
      </article>
    </div>

    <div class="grid gap-5 xl:grid-cols-[1.35fr,0.95fr]">
      <article class="soft-card rounded-[28px] p-5 md:p-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
              складская активность
            </p>
            <h3 class="mt-2 text-2xl font-semibold">Последние добавленные товары</h3>
          </div>
          <span class="rounded-full bg-[color:var(--color-accent-soft)] px-3 py-1 text-sm text-[color:var(--color-accent)]">
            {{ recentProducts.length }} позиций
          </span>
        </div>

        <div class="mt-5 grid gap-4">
          <div
            v-for="product in recentProducts"
            :key="product.id"
            class="flex flex-col gap-4 rounded-[24px] border border-black/[0.06] bg-white/80 p-4 md:flex-row md:items-center"
          >
            <img
              :src="getProductImage(product.image)"
              :alt="product.name"
              class="h-24 w-full rounded-[22px] object-cover md:w-36"
            />
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h4 class="text-lg font-semibold text-[color:var(--color-ink)]">
                  {{ product.name }}
                </h4>
                <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  ID {{ product.id }}
                </span>
              </div>
              <p class="mt-2 text-sm text-[color:var(--color-ink-soft)]">
                {{ getCategoryName(product.categoryId) }} · {{ getCellName(product.cellId) }}
              </p>
            </div>
            <div class="rounded-[22px] bg-slate-950 px-4 py-3 text-white">
              <p class="text-xs uppercase tracking-[0.25em] text-white/55">остаток</p>
              <p class="mt-1 text-2xl font-semibold">{{ product.quantity }}</p>
            </div>
          </div>
        </div>
      </article>

      <div class="grid gap-5">
        <article class="soft-card rounded-[28px] p-5 md:p-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
                загрузка склада
              </p>
              <h3 class="mt-2 text-2xl font-semibold">Статус ячеек</h3>
            </div>
            <div class="rounded-2xl bg-slate-950 p-3 text-white">
              <PhChartDonut :size="22" />
            </div>
          </div>

          <div class="mt-6">
            <div class="flex items-end justify-between gap-4">
              <div>
                <p class="text-4xl font-semibold">{{ occupiedCellsCount }}/{{ cellsCount }}</p>
                <p class="mt-2 text-sm text-[color:var(--color-ink-soft)]">
                  занято ячеек
                </p>
              </div>
              <p class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {{ freeCellsCount }} свободно
              </p>
            </div>

            <div class="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                class="h-full rounded-full bg-gradient-to-r from-[color:var(--color-accent)] to-emerald-500 transition-all duration-300"
                :style="{ width: `${cellsCount ? (occupiedCellsCount / cellsCount) * 100 : 0}%` }"
              ></div>
            </div>
          </div>
        </article>

        <article class="soft-card rounded-[28px] p-5 md:p-6">
          <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
            распределение по категориям
          </p>
          <h3 class="mt-2 text-2xl font-semibold">Товарная матрица</h3>

          <div class="mt-5 grid gap-3">
            <div
              v-for="category in categoryDistribution"
              :key="category.id"
              class="rounded-[22px] border border-black/[0.06] bg-white/80 p-4"
            >
              <div class="flex items-center justify-between gap-4">
                <div>
                  <p class="font-semibold text-[color:var(--color-ink)]">{{ category.name }}</p>
                  <p class="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                    {{ category.productsCount }} товаров · {{ category.quantity }} ед.
                  </p>
                </div>
                <div class="w-20 rounded-full bg-slate-100 px-3 py-1 text-center text-sm font-medium text-slate-700">
                  {{ category.productsCount }}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
