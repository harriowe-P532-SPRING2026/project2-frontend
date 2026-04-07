import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("/user", "routes/user.jsx"),
    route("/order", "routes/new-order.jsx"),
    route("/audit-log", "routes/audit-log.jsx"),
    route("/triage-strat", "routes/triage-strat.jsx")
] satisfies RouteConfig;
