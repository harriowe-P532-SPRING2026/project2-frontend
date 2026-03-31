import useOrderStore from "../lib/orderStore";
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useNavigate } from "react-router";

export default function NewOrder() {
    const user = useOrderStore((state) => state.user)
    const submitOrderAPI = useOrderStore((state) => state.submitOrder);
    const [orderType, setOrderType] = useState("lab")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("routine");
    const [name, setName] = useState("")
    const navigate = useNavigate();

    async function submitOrder() {
        console.log({
            type: orderType,
            clinicianId: user.id,
            description: description,
            priority: priority,
            patientName: name
        })
        await submitOrderAPI({
            type: orderType,
            clinicianId: user.id,
            description: description,
            priority: priority,
            patientName: name
        })

        navigate("/")
    }

    const junk = {
        "type": "lab",
        "clinicianId": 210822748,
        "description": "test",
        "priority": "stat",
        "patientName": "Jeffery Matterson"
    }

    return (
        <div className="w-50/100 m-auto">
            <h1 className="text-2xl mb-2">New Order</h1>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-description">Description</FieldLabel>
                    <Input id="fieldgroup-description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">Patient Name</FieldLabel>
                    <Input id="fieldgroup-name" type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-orderType">Order Type</FieldLabel>
                    <Select value={orderType} onValueChange={(e) => setOrderType(e)}>
                        <SelectTrigger id="fieldgroup-orderType">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="lab">Lab Order</SelectItem>
                            <SelectItem value="medication">Medication Order</SelectItem>
                            <SelectItem value="imaging">Imaging Order</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-priority">Priority</FieldLabel>
                    <Select value={priority} onValueChange={(e) => setPriority(e)}>
                        <SelectTrigger id="fieldgroup-priority">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="routine">Routine</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="stat">Stat</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={(e) => submitOrder()}>
                    Submit
                </Button>

            </FieldGroup>
        </div>
    )
}