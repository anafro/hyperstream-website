<script setup lang="ts">
import Button from "@/components/shared/Button.vue";
import Text from "@/components/shared/Text.vue";
</script>

<template>
<div class="flex items-center justify-between">
    <div class="flex flex-col gap-y-4">
        <Text>
            Hyperstream is a streaming with audio effects! <br>
            Free. Open source. Yours. Everywhere.
        </Text>
        <div class="flex gap-x-4">
            <Button variant="primary">Start listening</Button>
            <Button variant="secondary">Log in</Button>
        </div>
    </div>
</div>
</template>
