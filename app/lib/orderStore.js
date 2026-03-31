import { create } from 'zustand'

// const host = "https://triage-api.harrisowe.me"
const host = "http://localhost:8080"

const useOrderStore = create((set, get) => ({
    user: null,
    logIn: async () => {
        
    },
    logOut: async () => {
        set({user: null})
    },
    orders: [],
    fetchOrder: async(filter) => {

    },
    submitOrder: async (orderRequest) => {

    },
    logs: [],
    fetchLogs: async () => {

    },
    escalateOrder: async (id) => {

    },
    cancelOrder: async (id) => {

    },
    claimOrder: async (id) => {

    },
    finishOrder: async (id) => {

    }
}));

export default useOrderStore;
