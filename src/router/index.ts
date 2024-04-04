import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import NoLayout from '@/layout/NoLayout.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import routesConfig from '@/config/routes'
import ChatView from '@/views/ChatView.vue'
import Customers from '@/views/Customers.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'DefaultLayout',
        component: DefaultLayout,
        children: [
          {
            path: routesConfig.home,
            name: 'home',
            component: HomeView
          },
          {
            path: routesConfig.chat,
            name: 'chat',
            component: ChatView
          },
          {
            path: routesConfig.customers,
            name: 'customers',
            component: Customers
          },
          {
            path: routesConfig.products,
            name: 'products',
            component: Products
          },
          {
            path: routesConfig.orders,
            name: 'orders',
            component: Orders
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
          },
          {
            path: routesConfig.notFound,
            name: 'notFound',
            component: NotFound,
          }
        ]
      }
  ]
})

export default router
