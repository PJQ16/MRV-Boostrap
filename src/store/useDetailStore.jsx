import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  details: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchDetail: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/detail`);
      set({ details: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addDetail: async (newDetail) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/detail`, newDetail);
      set((state) => ({
        details: [...state.details, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editDetail: async (updatedDetail) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/detail/${updatedDetail.id}`, updatedDetail);
      set((state) => ({
        details: state.details.map((detail) =>
          detail.id === updatedDetail.id ? response.data : detail // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/detail/${id}`);
      set((state) => ({
        details: state.details.filter((detail) => detail.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
