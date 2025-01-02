import { create } from "zustand";

const useMenuStore = create((set) => ({
  activeMenu: null,
  setActiveMenu: (menu) => set({ activeMenu: menu }), 
}));

export default useMenuStore;