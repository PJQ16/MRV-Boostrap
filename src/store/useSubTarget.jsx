import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  subTargets: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchSubTarget: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/subtarget`);
      set({ subTargets: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addSubTarget: async (newSubtarget) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/subtarget`, newSubtarget);
      set((state) => ({
        subTargets: [...state.subTargets, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editSubTarget: async (updatedSubTarget) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/subtarget/${updatedSubTarget.id}`, updatedSubTarget);
      set((state) => ({
        subTargets: state.subTargets.map((subTarget) =>
          subTarget.id === updatedSubTarget.id ? response.data : subTarget // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeSubTarget: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/subtarget/${id}`);
      set((state) => ({
        subTargets: state.subTargets.filter((subTarget) => subTarget.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
