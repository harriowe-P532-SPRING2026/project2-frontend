import { useEffect } from "react";
import useOrderStore from "../lib/orderStore";
import { Button } from "@/components/ui/button"

export default function AuditLog() {
    const role = useOrderStore(state => state.user.type)
    const logs = useOrderStore(state => state.logs);
    const fetchLogs = useOrderStore(state => state.fetchLogs);
    const undo = useOrderStore(state => state.undo)
    const redo = useOrderStore(state => state.redo)

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
                {logs.map((l, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span>{l}</span>
                        {role == "admin" && <Button variant="outline" onClick={() => redo(l)}>Redo</Button>}
                    </li>
                ))}
            </ol>
            {
                role == "admin" ?
                <Button variant="outline" onClick={() => undo()}>Undo Last Command</Button>
                :
                <div></div>
            }
        </div>
    )
}