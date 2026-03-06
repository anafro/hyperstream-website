<script setup lang="ts">
import ErrorLayout from "@/layouts/ErrorLayout.vue";
import Logotype from "@/components/shared/Logotype.vue";
import Text from "@/components/shared/Text.vue";
</script>

<template>
<ErrorLayout>
    <div class="flex flex-col gap-y-4">
        <Logotype variant="logo"></Logotype>
        <Text class="text-center">
            Something went wrong.
        </Text>
    </div>
</ErrorLayout>
</template>
