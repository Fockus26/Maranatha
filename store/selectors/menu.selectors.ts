import type { RootState } from "@/store/index";

export const selectMenuIsOpen = (state: RootState) => state.menu.isOpen;
