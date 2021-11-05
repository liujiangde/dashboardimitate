import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(()=>{
    const { espire = 0 } = stotage
})


export default router
