import { create } from 'zustand'

const host = "https://triage-api-part2.harrisowe.me"
// const host = "http://localhost:8080"

const useOrderStore = create((set, get) => ({
    user: null,
    _userPollInterval: null,
    _startUserPolling: () => {
        if (get()._userPollInterval) return;
        const id = setInterval(() => get().fetchUser(), 3000);
        set({ _userPollInterval: id });
    },
    _stopUserPolling: () => {
        const id = get()._userPollInterval;
        if (id) {
            clearInterval(id);
            set({ _userPollInterval: null });
        }
    },
    restoreUser: async () => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            await get().logIn(savedName);
        }
    },
    fetchUser: async () => {
        const user = get().user;
        if (!user) return;
        const response = await fetch(`${host}/user/${user.name}`, { method: "POST" });
        if (!response.ok) return;
        const updated = await response.json();
        console.log(updated)
        set({ user: updated });
    },
    setNotificationPrefs: async (prefs) => {
        const response = await fetch(`${host}/user/notifications/${get().user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(prefs)
        })

        if (!response.ok) {
            console.error("failed to set notification prefs")
        } else {
            set({user: {...get().user, notificationPreferences : prefs}})
        }
    },
    clearNotifications: async () => {
        const response = await fetch(`${host}/user/notifications/${get().user.id}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            console.error("failed to clear notification prefs")
        } else {
            set({user: {...get().user, notificationPreferences : []}})
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
        get()._startUserPolling();
        return true;
    },
    logOut: async () => {
        get()._stopUserPolling();
        localStorage.removeItem("userName");
        set({user: null})
    },
    signUp: async (name, type, email) => {
        const response = await fetch(`${host}/user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, type, email})
        })
        if (!response.ok) {
            console.error("Failed to login");
            return false;
        }
        const user = await response.json();
        console.log(user);
        set({user, filter: user.role == "clinician" ? "user" : "all"})
        get()._startUserPolling();
    },
    orders: [],
    fetchOrders: async() => {
        let path = ""
        let filter = get().filter;
        if (filter == "user") {
            path = `${get().user.id}/`
        } else if (filter == "all" || filter == "active") {
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
    },
    strategy: "simple",
    getStrategy: async () => {
        const response = await fetch(`${host}/order/triage-strat/`);
        if (!response.ok) {
            console.error("error fetching current strat");
            const text = await response.text();
            alert(text);
        }
        const json = await response.text();
        set({strategy: json})
        return json;
    },
    setStrategy: async (strat) => {
        const response = await fetch(`${host}/order/triage-strat/${strat}`, {
            method: "POST"
        })
        if (!response.ok || !await response.text()) {
            console.error("error setting current strat");
        }
        set({strategy: strat})
    },
    undo: async () => {
        const response = await fetch(`${host}/order/audit-log/undo/${get().user.id}`, {
            method: "POST"
        })
        if (!response.ok) {
            console.error("Failed to undo order")
            alert(await response.text());
        }
    },
    redo: async (description) => {
        const response = await fetch(`${host}/order/audit-log/redo/${get().user.id}`, {
            method: "POST",
            body: description
        })
        if (!response.ok) {
            console.error("Failed to undo order")
            alert(await response.text());
        }
    }
}));

export default useOrderStore;
