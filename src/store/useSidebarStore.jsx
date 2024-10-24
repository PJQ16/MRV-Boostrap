import {create} from 'zustand';

const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  isDropdownOpen: false,

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDropdown: () => set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
  setDropdownOpen: (isOpen) => set({ isDropdownOpen: isOpen }),
}));

export default useSidebarStore;
