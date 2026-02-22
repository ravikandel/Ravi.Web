import { HealthCheck } from "./features/healthcheck/pages/HealthCheck";
import { Home } from "./features/Home";

const AppRoutes = [
    {
        index: true,
        path:'/',
        element: <Home/>
    },
    {
        index: false,
        path:'/home',
        element: <Home/>
    },
    {
        index: false,
        path:'/health-check',
        element: <HealthCheck/>
    }
];

export default AppRoutes;