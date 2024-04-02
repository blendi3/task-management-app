import { lazy } from "react";
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const AllTasks = lazy(() => import("./pages/AllTasks"));
const ImportantTasks = lazy(() => import("./pages/ImportantTasks"));
const CompletedTasks = lazy(() => import("./pages/CompletedTasks"));
const IncompletedTasks = lazy(() => import("./pages/IncompletedTasks"));

export const routes = [
  { path: "/login", component: Login, isProtected: false },
  { path: "/signup", component: Signup, isProtected: false },
  { path: "/forgotpassword", component: ForgotPassword, isProtected: false },
  { path: "/", component: AllTasks, isProtected: true },
  { path: "/important", component: ImportantTasks, isProtected: true },
  { path: "/completed", component: CompletedTasks, isProtected: true },
  { path: "/doitnow", component: IncompletedTasks, isProtected: true },
];
