import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const SET_CURRENT_MERGE = "SET_CURRENT_MERGE";
export const setCurrentMerge = createAction(SET_CURRENT_MERGE);

export const currentMerge = handleActions(
  {
    SET_CURRENT_MERGE: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);
