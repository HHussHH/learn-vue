import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import PostWithStore from "@/pages/PostWithStore";
import PostPageWithComposition from "@/pages/PostPageWithComposition";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/posts",
    component: PostPage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts/:id",
    component: PostIdPage,
  },
  {
    path: "/store",
    component: PostWithStore,
  },
  {
    path: "/compositions",
    component: PostPageWithComposition,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
