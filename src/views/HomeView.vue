<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue'

</script>

<template>
  <PrivateRoute :redirect="routesConfig.home">
    <div>
      <h1>HOME VIEW</h1>
    </div>
  </PrivateRoute>
</template>
