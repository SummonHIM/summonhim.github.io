import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果是通过浏览器的 前进/后退 按钮触发，则回到之前保存的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = '默认标题' // 如果没有配置title，显示默认值
  }
})

export default router
