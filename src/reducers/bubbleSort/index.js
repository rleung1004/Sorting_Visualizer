import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_BUBBLE = "SET_CURRENT_BUBBLE";
export const setCurrentBubble = createAction(SET_CURRENT_BUBBLE);

export const currentBubble = handleActions(
  {
    SET_CURRENT_BUBBLE: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);
