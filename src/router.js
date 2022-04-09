import { createRouter, createWebHistory } from "vue-router"
import CoachList from './pages/coaches/CoachList.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestList from "./pages/requests/RequestList.vue"
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/store'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },

        { path: '/coaches', component: CoachList },
        {
            path: '/coaches/:id', component: CoachDetails,props:true, children: [
                { path: 'contact', component: ContactCoach }
            ]
        },
        { path: '/register', component: CoachRegistration, meta:{requireAuth:true} },
        { path: '/requests', component: RequestList,meta:{requireAuth:true} },
        { path: '/auth', component: UserAuth },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

router.beforeEach((to,_,next)=>{
    if(to.meta.requireAuth && !store.getters.isAuthenticated){
        next('/auth')
    }
    else if(to.path=='/auth' && store.getters.isAuthenticated){
        next('/coaches')
    }
    else{
        next()
    }
})

export default router;