import { createAction, handleActions } from "redux-actions";

const initialStateOne = [];
const initialStateTwo = null;

export const SET_CURRENT_QUICK = "SET_CURRENT_QUICK";
export const setCurrentQuick = createAction(SET_CURRENT_QUICK);
export const SET_PIVOT = "SET_PIVOT";
export const setPivot = createAction(SET_PIVOT);

export const currentQuick = handleActions(
  {
    SET_CURRENT_QUICK: (state, { payload }) => {
      return payload;
    },
  },
  initialStateOne
);
export const pivot = handleActions(
  {
    SET_PIVOT: (state, { payload }) => {
      return payload;
    },
  },
  initialStateTwo
);
