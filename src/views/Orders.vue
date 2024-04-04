<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue'

</script>

<template>
  <PrivateRoute :redirect="routesConfig.orders">
    <div>
      <h1>ORDERS VIEW</h1>
    </div>
  </PrivateRoute>
</template>
