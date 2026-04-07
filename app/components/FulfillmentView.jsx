import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import { Button } from "@/components/ui/button"

    import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useOrderStore from "../lib/orderStore"
import { useEffect } from "react";
import OrderTable from "./OrderTable";

export default function FulfillmentView() {
    const filter = useOrderStore(state => state.filter);
    const setFilter = useOrderStore(state => state.setFilter);
    const orders = useOrderStore(state => state.orders);
    const fetchOrders = useOrderStore(state => state.fetchOrders);

    useEffect(() => {
        console.log(orders);
    }, [orders])

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [filter])

    useEffect(() => {
        const interval = setInterval(fetchOrders, 3000);
        return () => clearInterval(interval);
    }, [])

    const displayOrders = filter === "active"
        ? orders.filter(o => o.status !== "COMPLETED" && o.status !== "CANCELLED")
        : orders;

    return (
        <div className="w-65/100 m-auto">
            <h1 className="text-2xl mb-2">Order Queue</h1>
            <Field className="mb-2">
                <FieldLabel htmlFor="fieldgroup-filter">User Type</FieldLabel>
                <Select value={filter} onValueChange={(e) => setFilter(e)}>
                    <SelectTrigger id="userType-filter">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="non-complete">Non Completed</SelectItem>
                        <SelectItem value="active">Non-Completed / Non-Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            <OrderTable orders={displayOrders} role={"fulfillment"} />
        </div>
    )
}