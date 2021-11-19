import { createWebHistory, createRouter } from "vue-router";
import Home from "@/pages/Homepage.vue";
import GitView from "@/pages/GitView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/gitview",
        name: "GitView",
        component: GitView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;