import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import NoLayout from '@/layout/NoLayout.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'DefaultLayout',
        component: DefaultLayout,
        children: [
          {
            path: '/',
            name: 'home',
            component: HomeView
          }
        ]
      },
      {
        path: '/',
        name: 'NoLayout',
        component: NoLayout,
        children: [
          {
            path: '/login',
            name: 'login',
            component: LoginView
          }
        ]
      }
  ]
})

export default router
