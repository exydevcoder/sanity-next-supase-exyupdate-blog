type DialogType = 'auth' | 'search' | 'settings' | null;

// Define specific data types for each dialog
export interface AuthDialogData {
  mode?: 'login' | 'register';
  redirectUrl?: string;
}

export interface SearchDialogData {
  initialQuery?: string;
  category?: string;
}

// Union type for all dialog data
type DialogDataMap = {
  auth: AuthDialogData;
  search: SearchDialogData;
};

export interface DialogStore {
  type: DialogType;
  isOpen: boolean;
  data?: AuthDialogData | SearchDialogData;
  onOpen: <T extends keyof DialogDataMap>(type: T, data?: DialogDataMap[T]) => void;
  onClose: () => void;
}
