import App from './App.vue' 
import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import router from './router';
import store from './store';

// Optional, since every component imports their Bootstrap functionality
// the following line is not necessary  
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.use(store)
app.mount('#app')