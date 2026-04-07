import LogInSignUp from "../components/LogInSignUp";
import useOrderStore from "../lib/orderStore";
import { Button } from "@/components/ui/button"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from "@/components/ui/combobox"
const possibleNotificationPreferences = ["email", "console", "dashboard"]
const EMPTY_PREFS = [];

export default function User() {
    const user = useOrderStore((state) => state.user);
    const signOut = useOrderStore((state) => state.logOut);
    const notificationPrefs = useOrderStore(state => state.user?.notificationPreferences ?? EMPTY_PREFS);
    const setNotificationPrefs = useOrderStore((state) => state.setNotificationPrefs);
    const clearNotifications = useOrderStore((state) => state.clearNotifications);


    if (user == null) {
        return <LogInSignUp />
    } 

    return (
        <div className="w-50/100 m-auto">
            <h1 className="text-2xl">User Page:</h1>
            <p>{user?.name}</p>
            <h2 className="text-xl">Notifications</h2>
            <ol className="list-decimal list-inside space-y-1">
                {user.notifications.map(n => <li>{n}</li>)}
            </ol>
            <Button type="submit" className="w-35 mt-2" onClick={(e) => clearNotifications()}>
                    Clear Notifications
            </Button>
            <h2 className="text-l">Notification Settings</h2>
            <Combobox
                items={possibleNotificationPreferences}
                multiple
                value={notificationPrefs}
                onValueChange={setNotificationPrefs}
            >
                <ComboboxChips>
                    <ComboboxValue>
                    {notificationPrefs.map((item) => (
                        <ComboboxChip key={item}>{item}</ComboboxChip>
                    ))}
                    </ComboboxValue>
                    <ComboboxChipsInput placeholder="No Notifications"/>
                </ComboboxChips>
                <ComboboxContent>
                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                    <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                        {item}
                        </ComboboxItem>
                    )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
            <Button type="submit" className="w-25 mt-2" onClick={(e) => signOut()}>
                    SignOut
            </Button>
        </div>
    )
}