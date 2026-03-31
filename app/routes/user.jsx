import LogInSignUp from "../components/LogInSignUp";
import useOrderStore from "../lib/orderStore";
import { Button } from "@/components/ui/button"


export default function User() {
    const user = useOrderStore((state) => state.user);
    const signOut = useOrderStore((state) => state.logOut);

    if (user == null) {
        return <LogInSignUp />
    } 

    return (
        <div className="w-50/100 m-auto">
            <h1 className="text-2xl">User Page:</h1>
            <p>{user?.name}</p>
            <Button type="submit" className="w-25 mt-2" onClick={(e) => signOut()}>
                    SignOut
            </Button>
        </div>
    )
}