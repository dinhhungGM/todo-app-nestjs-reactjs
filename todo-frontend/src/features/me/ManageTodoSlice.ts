import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ManageTodoState {
  isOpenCreateTodoModal: boolean;
  todoDetail: {
    _id: string,
    title: string,
    description: string
  }
}

const initialState: ManageTodoState = {
  isOpenCreateTodoModal: false,
  todoDetail: {
    _id: "",
    title: "",
    description: ""
  }
};

export const manageTodoSlice = createSlice({
  name: "ManageTodo",
  initialState,
  reducers: {
    toggleUpdateTodoModal: (state) => {
      state.isOpenCreateTodoModal = !state.isOpenCreateTodoModal;
    },
    updateTodoDetails: (state, action) => {
      state.todoDetail = action.payload
      console.log(state.todoDetail);
    }
  },
});

export const { toggleUpdateTodoModal, updateTodoDetails } = manageTodoSlice.actions;

export const selectIsOpenUpdateTodoModal = (state: RootState) =>
  state.manageTodo.isOpenCreateTodoModal;
export const selectTodoDetails = (state: RootState) => state.manageTodo.todoDetail;

export default manageTodoSlice.reducer;
