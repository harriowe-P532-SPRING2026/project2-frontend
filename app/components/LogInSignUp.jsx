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

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router"
import useOrderStore from "../lib/orderStore"


  
export default function LogInSignUp() {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("clinician")
    const [email, setEmail] = useState("")
    const logIn = useOrderStore((state) => state.logIn);
    const signUp = useOrderStore((state) => state.signUp);
    
    const navigate = useNavigate();



    async function callLogIn() {
        if (await logIn(userName)) {
            navigate("/")
        } else {
            alert("Failed to login");
        }
    }

    async function callSignUp() {
        await signUp(name, type, email);
        navigate("/")
    }
    
    return (
        <div className="w-50/100 m-auto">
            <FieldGroup>
                <h2>Sign In</h2>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                    <Input id="fieldgroup-name" value={userName} onChange={(e) => setUserName(e.target.value)}></Input>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={(e) => callLogIn()}>
                    Submit
                </Button>

            </FieldGroup>
            
            <FieldGroup>
                <h2>Sign Up</h2>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-name1">Name</FieldLabel>
                    <Input id="fieldgroup-name1" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                    <Input id="fieldgroup-email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                </Field>

                <Field>
                    <FieldLabel htmlFor="fieldgroup-userType">User Type</FieldLabel>
                    <Select value={type} onValueChange={(e) => setType(e)}>
                        <SelectTrigger id="userType-orderType">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="clinician">Clinician</SelectItem>
                            <SelectItem value="fulfillment">Fulfillment Staff</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Button type="submit" className="w-25 mt-2" onClick={(e) => callSignUp()}>
                    Submit
                </Button>

            </FieldGroup>

        </div>
    )
}