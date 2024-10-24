import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  milestones: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchMileStone: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/milestone`);
      set({ milestones: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addMileStone: async (newMileStone) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/milestone`, newMileStone);
      set((state) => ({
        milestones: [...state.milestones, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array milestones
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editMileStone: async (updatedMileStone) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/milestone/${updatedMileStone.id}`, updatedMileStone);
      set((state) => ({
        milestones: state.milestones.map((milestone) =>
          milestone.id === updatedMileStone.id ? response.data : milestone // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeMileStone: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/milestone/${id}`);
      set((state) => ({
        milestones: state.milestones.filter((milestone) => milestone.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
