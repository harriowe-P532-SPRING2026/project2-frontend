import useOrderStore from "../lib/orderStore";
import { DataTable } from "./DataTable";
import { Button } from "@/components/ui/button"


const example = {
    "id": -535101257,
    "clinician": {
      "id": 210822748,
      "type": "clinician",
      "name": "Owen Harris"
    },
    "description": "test",
    "priority": "STAT",
    "patientName": "Jeffery Matterson",
    "fulfillmentStaff": null,
    "status": "PENDING",
    "timeCompleted": null,
    "timeCreated": "2026-03-31T16:47:07.54164392",
    "type": "lab"
}



export default function OrderTable({orders, role}) {
    const escalateOrder = useOrderStore(state => state.escalateOrder);
    const cancelOrder = useOrderStore(state => state.cancelOrder);
    const claimOrder = useOrderStore(state => state.claimOrder);
    const finishOrder = useOrderStore(state => state.finishOrder);


    const columnDef = [
        {
            accessorKey: "type",
            header: "Type",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            accessorKey: "clinician",
            header: "Clinician",
            cell: ({row}) => row.getValue("clinician")?.name
        },
        {
            accessorKey: "priority",
            header: "Priority",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "timeCreated",
            header: "Time Created",
            cell: ({row}) => {
                const formatted = new Intl.DateTimeFormat("en-US", {                                                                                                                                               
                    dateStyle: "medium",                                                                                                                                                         
                    timeStyle: "short",                                                                                                                                                            
                  }).format(new Date(row.getValue("timeCreated")))
                return <div className="font-medium">{formatted}</div>
            }
        },
        {
            id: "action",
            meta: { style: { width: '1px' } },
            cell: ({row}) => {
                return role == "clinician" ?
                <div>
                    <Button variant="outline" className="h-8 p-2 ml-2" onClick={(e) => escalateOrder(row.original.id)}>
                        Escalate
                    </Button>
                    <Button variant="outline" className="h-8 p-2 ml-2" onClick={(e) => cancelOrder(row.original.id)}>
                        Cancel
                    </Button>
                </div>
                :
                <div>
                    <Button variant="outline" className="h-8 p-2 ml-2" onClick={(e) => claimOrder(row.original.id)}>
                        Claim
                    </Button>
                    <Button variant="outline" className="h-8 p-2 ml-2" onClick={(e) => finishOrder(row.original.id)}>
                        Finish
                    </Button>
                </div>
            }
        }
    
    ];

    return (
        <DataTable columns={columnDef} data={orders} />
    )
}