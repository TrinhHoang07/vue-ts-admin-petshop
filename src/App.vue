<script setup lang="ts">
import { RouterView } from 'vue-router';
import ConfirmToastContext from './context/ConfirmToastContext.vue';
</script>

<template>
    <ConfirmToastContext>
        <RouterView />
    </ConfirmToastContext>
</template>
