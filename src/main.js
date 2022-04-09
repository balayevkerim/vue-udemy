import { createApp } from 'vue';
import router from './router'
import store from './store/store'
import App from './App.vue'
import BaseCard from './ui/BaseCard'
import BaseButton from './ui/BaseButton'
import BaseBadge from './ui/BaseBadge'
import BaseSpinner from './ui/BaseSpinner'
import BaseDialog from './ui/BaseDialog'
import UserAuth from './pages/auth/UserAuth'
const app  = createApp(App)

app.component('base-card',BaseCard)
app.component('base-button',BaseButton)
app.component('base-badge',BaseBadge)
app.component('base-spinner',BaseSpinner)
app.component('base-dialog',BaseDialog)
app.component('user-auth',UserAuth)



app.use(router)
app.use(store)
app.mount('#app');
