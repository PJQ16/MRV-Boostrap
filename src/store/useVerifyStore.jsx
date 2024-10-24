import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  periods: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchPeriods: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/period`);
      set({ periods: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addPeriod: async (newPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/period`, newPeriod);
      set((state) => ({
        periods: [...state.periods, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editPeriod: async (updatedPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/period/${updatedPeriod.id}`, updatedPeriod);
      set((state) => ({
        periods: state.periods.map((period) =>
          period.id === updatedPeriod.id ? response.data : period // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removePeriod: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/period/${id}`);
      set((state) => ({
        periods: state.periods.filter((period) => period.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
