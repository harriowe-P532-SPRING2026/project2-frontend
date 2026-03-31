import useOrderStore from "../lib/orderStore";

export default function User() {
    const user = useOrderStore((state) => state.user);

    if (user == null) {
        return
    }
}