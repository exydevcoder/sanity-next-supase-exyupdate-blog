import { DialogStore } from '@/types/dialog-store-types';
import { create } from 'zustand';

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  isOpen: false,
  data: undefined,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: undefined }),
}));