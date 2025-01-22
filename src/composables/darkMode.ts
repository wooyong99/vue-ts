import { ref, watchEffect } from 'vue';

export function useDarkMode() {
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
        console.log('토글');
        console.log(isDarkMode.value);
        isDarkMode.value = !isDarkMode.value;
    };

    return { isDarkMode, toggleDarkMode };
}
