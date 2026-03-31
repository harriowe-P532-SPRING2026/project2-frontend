import { useEffect } from "react";
import useOrderStore from "../lib/orderStore";

export default function AuditLog() {
    const logs = useOrderStore(state => state.logs);
    const fetchLogs = useOrderStore(state => state.fetchLogs);

    useEffect(() => {
        const interval = setInterval(fetchLogs, 3000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        console.log(logs)
    }, [logs])

    return (
        <div className="w-65/100 m-auto">
            <h1 className="text-2xl mb-2">Audit Log</h1>
            <ol className="list-decimal list-inside space-y-1">
                {logs.map(l => <li>{l}</li>)}
            </ol>
        </div>
    )
}