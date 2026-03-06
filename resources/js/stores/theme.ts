import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useThemePreferenceStore = defineStore('theme-preference', () => {
    const theme = ref('dark');
    const icon = computed(() => `${theme.value}_mode`)

    function toggle(): void {
        switch (theme.value) {
            case 'dark':
                theme.value = 'light';
                break;

            case 'light':
                theme.value = 'dark';
                break;

            default:
                throw new Error(`Unknown theme name ${theme.value}, expected either dark, or light.`);
        }
    }

    return { icon, theme, toggle };
}, {
    persist: true,
});
