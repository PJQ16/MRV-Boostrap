import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useStore = create((set) => ({
  subcategorys: [],
  isLoading: false,
  error: null,

  // สำหรับแสดงข้อมูล
  fetchSubcategory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${config.urlApi}/api/subcategory`);
      set({ subcategorys: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับเพิ่มข้อมูล
  addSubcategory: async (newSubcategory) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${config.urlApi}/api/subcategory`, newSubcategory);
      set((state) => ({
        subcategorys: [...state.subcategorys, response.data], // เพิ่มข้อมูลใหม่เข้าไปใน array periods
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับแก้ไขข้อมูล
  editSubcategory: async (updatedSubcategorys) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${config.urlApi}/api/subcategory/${updatedSubcategorys.id}`, updatedSubcategorys);
      set((state) => ({
        subcategorys: state.subcategorys.map((subcategory) =>
          subcategory.id === updatedPeriod.id ? response.data : subcategory // แก้ไขข้อมูลที่ตรงกับ id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // สำหรับลบข้อมูล
  removeSubcategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${config.urlApi}/api/subcategory/${id}`);
      set((state) => ({
        subcategorys: state.subcategorys.filter((subcategory) => subcategory.id !== id), // กรองข้อมูลที่ไม่ตรงกับ id ที่ถูกลบออกไป
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
