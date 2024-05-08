import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: () => import('../pages/index.vue')},
        { path: '/todos', name: 'Todos', component: () => import('../pages/todos/index.vue')},
        { path: '/todos/create', name: 'TodoCreate', component: () => import('../pages/todos/create/index.vue')},
        { path: '/todos/:id', name: 'Todo', component: () => import('../pages/todos/_id.vue')}
    ] 
})
// 1-/home, 2-/todos, 3-/todos/create 4-/todos/:id
export default router