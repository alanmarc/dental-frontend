import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";

import { useAuthStore } from "../stores/authStore";
import LandingView from "../views/public/LandingView.vue";
import LoginView from "../views/public/LoginView.vue";
import DocumentationView from "../views/public/DocumentationView.vue";
import DashboardView from "../views/private/dashboard/DashboardView.vue";
import PatientsView from "../views/private/patients/PatientsView.vue";
import AppointmentsView from "../views/private/appointments/AppointmentsView.vue";
import UsersView from "../views/private/users/UsersView.vue";

const routes: Array<RouteRecordRaw> = [
  // Rutas públicas
  {
    path: "/landing",
    name: "Landing",
    component: LandingView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { guestOnly: true },
  },
  {
    path: "/documentacion",
    name: "Documentation",
    component: DocumentationView,
  },

  // Rutas protegidas
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/pacientes",
    name: "Patients",
    component: PatientsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/citas",
    name: "Appointments",
    component: AppointmentsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/usuarios",
    name: "Users",
    component: UsersView,
    meta: { requiresAuth: true },
  },

  // Redirección para rutas no encontradas
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 👇 Middleware de navegación para proteger rutas
router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore();

    // 📌 Asegurar que la sesión esté cargada
    authStore.loadSession();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next("/login");
    } else if (to.meta.guestOnly && authStore.isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  }
);
export default router;
