<script setup>
import { PhX } from "@phosphor-icons/vue";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
        @click.self="emit('close')"
      >
        <div class="glass-panel w-full max-w-2xl rounded-[30px] p-6 md:p-7">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-2xl font-semibold text-[color:var(--color-ink)]">
                {{ title }}
              </h3>
              <p
                v-if="description"
                class="mt-2 text-sm leading-6 text-[color:var(--color-ink-soft)]"
              >
                {{ description }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-2xl bg-black/5 p-2 text-[color:var(--color-ink)] transition hover:bg-black/10"
              @click="emit('close')"
            >
              <PhX :size="20" />
            </button>
          </div>

          <div class="mt-6">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
