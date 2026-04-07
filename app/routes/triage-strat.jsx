import { useState, useEffect } from "react";
import useOrderStore from "../lib/orderStore";
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "@/components/ui/field"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function TriageStrategy() {
    const getStrategy = useOrderStore(state => state.getStrategy);
    const setStrategyServer = useOrderStore(state => state.setStrategy);

    const [strategy, setStrategy] = useState("simple")
    
    useEffect(() => {
        async function getStrat() {
            const strat = await getStrategy();
            setStrategy(strat);
        }

        getStrat()
    }, [])

    async function changeAlgorithim() {
        await setStrategyServer(strategy)
    }

    return (
        <div className="w-50/100 m-auto">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-orderType">Stock Pricing Algorithim</FieldLabel>
                    <Select value={strategy} onValueChange={(e) => setStrategy(e)}>
                        <SelectTrigger id="fieldgroup-orderType">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="simple">Simple Triage</SelectItem>
                            <SelectItem value="loadBalance">Load Balance</SelectItem>
                            <SelectItem value="deadlineFirst">Deadline First</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>

                <Button type="submit" className="w-35 mt-2" onClick={(e) => changeAlgorithim()}>
                        Change Algorithim
                </Button>
            </FieldGroup>
        </div>
    )
}