<script setup>
import BaseModal from './BaseModal.vue';

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  cells: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['close', 'submit']);
</script>

<template>
  <BaseModal
    :open="open"
    title="Новый товар"
    description="Добавление новой позиции происходит без перезагрузки страницы. Все данные сразу сохраняются в LocalStorage."
    @close="emit('close')"
  >
    <form class="grid gap-4" @submit.prevent="emit('submit')">
      <label class="grid gap-2">
        <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Название товара</span>
        <input
          v-model="form.name"
          type="text"
          placeholder="Например, термопринтер для этикеток"
          class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
        />
      </label>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="grid gap-2">
          <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Категория</span>
          <select
            v-model="form.categoryId"
            class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
          >
            <option value="">Выберите категорию</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Ячейка хранения</span>
          <select
            v-model="form.cellId"
            class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
          >
            <option value="">Выберите ячейку</option>
            <option
              v-for="cell in cells"
              :key="cell.id"
              :value="cell.id"
            >
              Ряд {{ cell.row }}, ячейка {{ cell.number }}
            </option>
          </select>
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-[1fr,160px]">
        <label class="grid gap-2">
          <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">URL изображения</span>
          <input
            v-model="form.image"
            type="url"
            placeholder="Можно оставить пустым"
            class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
          />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-medium text-[color:var(--color-ink-soft)]">Количество</span>
          <input
            v-model="form.quantity"
            type="number"
            min="1"
            step="1"
            class="soft-card rounded-2xl px-4 py-3 outline-none transition focus:border-[color:var(--color-accent)]"
          />
        </label>
      </div>

      <div class="mt-2 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
        <button
          type="button"
          class="rounded-2xl border border-black/10 px-5 py-3 font-medium text-[color:var(--color-ink)] transition hover:bg-black/5"
          @click="emit('close')"
        >
          Отмена
        </button>
        <button
          type="submit"
          class="rounded-2xl bg-[color:var(--color-accent)] px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-ink)]"
        >
          Сохранить товар
        </button>
      </div>
    </form>
  </BaseModal>
</template>
