import { createApp } from 'vue';
import router from './router'
import store from './store/store'
import App from './App.vue'
import BaseCard from './ui/BaseCard'
import BaseButton from './ui/BaseButton'
import BaseBadge from './ui/BaseBadge'
import BaseSpinner from './ui/BaseSpinner'

const app  = createApp(App)

app.component('base-card',BaseCard)
app.component('base-button',BaseButton)
app.component('base-badge',BaseBadge)
app.component('base-spinner',BaseSpinner)


app.use(router)
app.use(store)
app.mount('#app');
