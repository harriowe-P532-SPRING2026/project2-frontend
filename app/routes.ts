import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("/user", "routes/user.jsx"),
] satisfies RouteConfig;
