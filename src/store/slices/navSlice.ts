import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NavState = {
  openKeys: string[];
  selectedKey?: string;
  collapsed: boolean;
};

const initialState: NavState = {
  openKeys: [],
  selectedKey: undefined,
  collapsed: false,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOpenKeys: (s, a: PayloadAction<string[]>) => {
      s.openKeys = a.payload;
    },
    setSelectedKey: (s, a: PayloadAction<string | undefined>) => {
      s.selectedKey = a.payload;
    },
    setCollapsed: (s, a: PayloadAction<boolean>) => {
      s.collapsed = a.payload;
    },
    resetNav: () => initialState,
  },
});

export const { setOpenKeys, setSelectedKey, setCollapsed, resetNav } = navSlice.actions;
export default navSlice.reducer;

