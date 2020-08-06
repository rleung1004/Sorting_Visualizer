import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_HEAP = "SET_CURRENT_HEAP";
export const setCurrentHeap = createAction(SET_CURRENT_HEAP);

export const currentHeap = handleActions(
  {
    SET_CURRENT_HEAP: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);
