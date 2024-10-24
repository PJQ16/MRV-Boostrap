import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  multis: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchMulti: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/multi_factor`);
      set({ multis: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addMulti: async (newPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/multi_factor`, newPeriod);
      set((state) => ({
        multis: [...state.multis, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editMulti: async (updatedMulti) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/multi_factor/${updatedMulti.id}`, updatedMulti);
      set((state) => ({
        multis: state.multis.map((multi) =>
          multi.id === updatedMulti.id ? response.data : multi // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeMulti: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/multi_factor/${id}`);
      set((state) => ({
        multis: state.multis.filter((multi) => multi.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
