import { create } from "zustand";

export const userStore = create((set) => ({
    users: null,
    setUsers: (users) => set({ users }),
    logout: () => set({ users: null }),

}));