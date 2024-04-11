import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import PrimeVue from 'primevue/config';
import Antd from 'ant-design-vue';
import CanvasJSChart from '@canvasjs/vue-charts';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(Antd)
app.use(CanvasJSChart);

app.mount('#app')
