<script setup lang="ts">
import Button from "@/components/shared/Button.vue";
import Icon from "@/components/shared/Icon.vue";
import Text from "@/components/shared/Text.vue";
import { onShortcut } from "@/hyperstream/support/vue/shortcut";
import { when } from "@/hyperstream/support/vue/when";
import { computed, unref, useTemplateRef } from "vue";


type Props = {
    placeholder?: string;
};

const {
    placeholder = '',
} = defineProps<Props>();


const inputRef = useTemplateRef('input');
const value = defineModel<string>({ required: true });
const empty = computed(() => unref(value).trim().length === 0);

const clear = () => value.value = '';
const focus = () => when(inputRef, input => input?.focus?.());
const emit = defineEmits<{
    submit: [],
}>();

defineExpose({
    clear,
    focus,
});

/// --- Behavior
onShortcut('ctrl+space', focus);
</script>

<template>
    <div
        class="flex rounded-md outline-transparent outline-1 dark:has-focus:outline-zinc-700 has-focus:outline-zinc-300">
        <input ref='input'
            class="px-4 py-2 grow outline-none rounded-ss-md rounded-es-md bg-zinc-200 dark:bg-zinc-800 caret-zinc-300 dark:caret-zinc-700 text-zinc-700 dark:text-zinc-300"
            type="search" @keyup.enter="emit('submit')" v-model.trim="value" :placeholder>

        <button
            class="flex items-center justify-center px-0 bg-zinc-200 dark:bg-zinc-800 cursor-pointer disabled:cursor-default"
            :disabled='empty' @click='clear'>
            <Icon class="text-zinc-400 dark:text-zinc-600" :class="{ 'opacity-0': empty }">close</Icon>
        </button>

        <div class="flex items-center justify-center px-4 bg-zinc-200 dark:bg-zinc-800">
            <Icon class="text-zinc-300 dark:text-zinc-700">keyboard_command_key</Icon>
            <Text class="text-zinc-300 dark:text-zinc-700"> + Space</Text>
        </div>

        <Button variant="primary" class="rounded-ss-none rounded-es-none flex gap-x-1" :disabled="value.length === 0"
            @click="emit('submit')">
            <Icon class="in-disabled:opacity-50">search</Icon>
            <Text class=" in-disabled:opacity-50 text-zinc-50 dark:text-zinc-950">Search</Text>
        </Button>
    </div>
</template>
