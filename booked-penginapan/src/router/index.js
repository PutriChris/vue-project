import { createRouter, createWebHistory } from "vue-router"
import Admin from "../pages/Admin.vue"
import Home from "../pages/Home.vue"
import Detail from "../pages/Detail.vue"
import Booking from "../pages/Booking.vue"
import NotFound from "../pages/NotFound.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: Detail
  },
  {
    path: "/booking",
    name: "Booking",
    component: Booking
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/penginapan",
    name: "Penginapan",
    component: Home
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router