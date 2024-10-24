import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  targets: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchTarget: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/target`);
      set({ targets: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addTarget: async (newTarget) => {
    set({ isLoading: true, error: null });
    try {
       const response = await axios.post(`${config.urlApi}/api/target`, newTarget);
      set((state) => ({
        targets: [...state.targets, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editTarget: async (updatedTarget) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/target/${updatedTarget.id}`, updatedTarget);
      set((state) => ({
        targets: state.targets.map((target) =>
          target.id === updatedTarget.id ? response.data : target // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeTarget: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/target/${id}`);
      set((state) => ({
        targets: state.targets.filter((target) => target.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
