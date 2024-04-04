<script setup lang="ts">
import routesConfig from '@/config/routes';
import PrivateRoute from '@/components/PrivateRoute.vue'

</script>

<template>
  <PrivateRoute :redirect="routesConfig.customers">
    <div>
      <h1>CUSTOMERS VIEW</h1>
    </div>
  </PrivateRoute>
</template>
