<script setup>
import {
  PhCheckCircle,
  PhGridFour,
  PhPlus,
  PhTrash,
  PhWarningCircle,
} from '@phosphor-icons/vue';

defineProps({
  cells: {
    type: Array,
    required: true,
  },
  freeCellsCount: {
    type: Number,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['submit', 'delete']);
</script>

<template>
  <section class="grid gap-5 xl:grid-cols-[0.85fr,1.15fr]">
    <article class="soft-card rounded-[28px] p-5 md:p-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
            создание ячейки
          </p>
          <h3 class="mt-2 text-2xl font-semibold">Новая складская ячейка</h3>
        </div>
        <div class="rounded-2xl bg-sky-100 p-3 text-sky-700">
          <PhGridFour :size="22" />
        </div>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="emit('submit')">
        <div class="grid gap-4 md:grid-cols-2">
          <label class="grid gap-2">
            <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Ряд</span>
            <input
              v-model="form.row"
              type="text"
              maxlength="2"
              placeholder="A"
              class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
            />
          </label>
          <label class="grid gap-2">
            <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Номер</span>
            <input
              v-model="form.number"
              type="number"
              min="1"
              step="1"
              placeholder="1"
              class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
            />
          </label>
        </div>

        <button
          type="submit"
          class="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--color-ink)] px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent)]"
        >
          <PhPlus :size="18" />
          Добавить ячейку
        </button>
      </form>

      <div class="mt-6 rounded-[24px] bg-[color:var(--color-accent-soft)] p-4 text-[color:var(--color-accent)]">
        Свободных ячеек сейчас: <strong>{{ freeCellsCount }}</strong>
      </div>
    </article>

    <article class="soft-card rounded-[28px] p-5 md:p-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
            карта склада
          </p>
          <h3 class="mt-2 text-2xl font-semibold">Статус ячеек</h3>
        </div>
      </div>

      <div class="mt-6 grid gap-3 md:grid-cols-2">
        <div
          v-for="cell in cells"
          :key="cell.id"
          class="rounded-[24px] border border-black/[0.06] bg-white/85 p-4"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
                ячейка {{ cell.id }}
              </p>
              <h4 class="mt-2 text-xl font-semibold text-[color:var(--color-ink)]">
                {{ cell.row }}-{{ cell.number }}
              </h4>
            </div>
            <div
              class="rounded-2xl p-3"
              :class="cell.isOccupied ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'"
            >
              <PhCheckCircle v-if="!cell.isOccupied" :size="20" />
              <PhWarningCircle v-else :size="20" />
            </div>
          </div>

          <p class="mt-3 text-sm text-[color:var(--color-ink-soft)]">
            {{ cell.isOccupied ? 'Ячейка занята товаром' : 'Ячейка свободна для размещения' }}
          </p>

          <button
            type="button"
            class="mt-5 flex items-center gap-2 rounded-2xl border border-rose-200 px-4 py-2 font-medium text-rose-600 transition hover:bg-rose-50"
            @click="emit('delete', cell.id)"
          >
            <PhTrash :size="16" />
            Удалить
          </button>
        </div>
      </div>
    </article>
  </section>
</template>
