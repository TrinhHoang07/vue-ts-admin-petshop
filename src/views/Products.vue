<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue'

</script>

<template>
  <PrivateRoute :redirect="routesConfig.products">
    <div>
      <h1>PRODUCTS VIEW</h1>
    </div>
  </PrivateRoute>
</template>
