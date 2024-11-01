import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  Transections: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchTransections: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/transection`);
      set({ Transections: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addTransections: async (newPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/transection`, newPeriod);
      set((state) => ({
        Transections: [...state.Transections, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editTransections: async (updatedPeriod) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/transection/${updatedPeriod.id}`, updatedPeriod);
      set((state) => ({
        Transections: state.Transections.map((Transection) =>
          Transection.id === updatedPeriod.id ? response.data : Transection // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeTransections: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/transection/${id}`);
      set((state) => ({
        Transections: state.Transections.filter((period) => period.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
