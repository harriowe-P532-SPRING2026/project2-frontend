import { create } from 'zustand'

const host = "https://triage-api.harrisowe.me"
// const host = "http://localhost:8080"

const useOrderStore = create((set, get) => ({
    user: null,
    restoreUser: async () => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            await get().logIn(savedName);
        }
    },
    filter: "user",
    setFilter: (filter) => {
        set({filter})
    },
    logIn: async (name) => {
        const response = await fetch(`${host}/user/${name}`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("Failed to login");
            return false;
        }
        const user = await response.json();
        console.log(user)
        localStorage.setItem("userName", name);
        set({user, filter: user.role == "clinician" ? "user" : "all"})
        return true;
    },
    logOut: async () => {
        localStorage.removeItem("userName");
        set({user: null})
    },
    signUp: async (name, type) => {
        const response = await fetch(`${host}/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, type})
        })
        if (!response.ok) {
            console.error("Failed to login");
            return false;
        }
        const user = await response.json();
        console.log(user);
        set({user, filter: user.role == "clinician" ? "user" : "all"})
    },
    orders: [],
    fetchOrders: async() => {
        let path = ""
        let filter = get().filter;
        if (filter == "user") {
            path = `${get().user.id}/`
        } else if (filter == "all") {
            path = ""
        } else if (filter == "pending") {
            path = "pending/"
        } else {
            path = "non-complete/"
        }

        console.log(`${host}/order/${path}`)
        
        const response = await fetch(`${host}/order/${path}`)
        if (!response.ok) {
            console.error("Error fetching orders")
        }
        const json = await response.json();

        set({orders: json})
    },
    submitOrder: async (orderRequest) => {
        const response = await fetch(`${host}/order/${get().user.id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderRequest)
        })
        if (!response.ok) {
            console.error("Failed to submit order")
            const text = await response.text();
            alert(text);
        }
        get().fetchOrders();
    },
    logs: [],
    fetchLogs: async () => {
        const response = await fetch(`${host}/order/audit-log/`)
        if (!response.ok){
            console.error("Failed to fetch audit log");
        }
        const logs = await response.json();
        set({logs});
    },
    escalateOrder: async (id) => {
        const response = await fetch(`${host}/order/${get().user.id}/${id}/escalate`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("error escalating order");
            const text = await response.text();
            alert(text);
        }
        get().fetchOrders();
    },
    cancelOrder: async (id) => {
        const response = await fetch(`${host}/order/${get().user.id}/${id}/cancel`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("error cancelling order");
            const text = await response.text();
            alert(text);
        }
        get().fetchOrders();
    },
    claimOrder: async (id) => {
        const response = await fetch(`${host}/order/${get().user.id}/${id}/claim`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("error claiming order");
            const text = await response.text();
            alert(text);
        }
        get().fetchOrders();
    },
    finishOrder: async (id) => {
        const response = await fetch(`${host}/order/${get().user.id}/${id}/finish`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("error finishing order");
            const text = await response.text();
            alert(text);
        }
        get().fetchOrders();
    }
}));

export default useOrderStore;
