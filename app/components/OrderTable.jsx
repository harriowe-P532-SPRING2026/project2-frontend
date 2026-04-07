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
    const user = useOrderStore(state => state.user)


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
            accessorKey: "fulfillmentStaff",
            header: "Fulfillment Staff",
            cell : ({row}) => {
                if (row.getValue("fulfillmentStaff") == null) {
                    return <div>N/A</div>;
                } else if (row.getValue("fulfillmentStaff")["id"] == user.id) {
                    return <div className="text-red-500">{row.getValue("fulfillmentStaff")["name"]}</div>
                } else {
                    return <div className="text-black">{row.getValue("fulfillmentStaff")["name"]}</div>
                }
            }
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

    const sortedOrders = [...orders].sort((a, b) => {
        const aTop = a.fulfillmentStaff?.id == user?.id && a.status === "PENDING";
        const bTop = b.fulfillmentStaff?.id == user?.id && b.status === "PENDING";
        return bTop - aTop;
    });

    return (
        <DataTable columns={columnDef} data={sortedOrders} />
    )
}