import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  plans: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchPlan: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/plan`);
      set({ plans: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addPlan: async (newPlan) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/plan`, newPlan);
      set((state) => ({
        plans: [...state.plans, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editPlan: async (updatedPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/plan/${updatedPeriod.id}`, updatedPeriod);
      set((state) => ({
        plans: state.plans.map((period) =>
          period.id === updatedPeriod.id ? response.data : period // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removePlan: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/plan/${id}`);
      set((state) => ({
        plans: state.plans.filter((period) => period.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
