/**=====================ACTION TYPES========================== */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
  MARK_AS_COMPLETED,
} from './types';

//-------------------SERVER ACTIONS --------------------------------------
import { GetAllTodo } from '../server/index';

/**==================== ACTION S===================================== */
export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  GetAllTodo().then((res) => {
    dispatch({
      type: GET_ITEMS,
      payload: res,
    });
  });
};

export const addItem = (item) => (dispatch, getState) => {
  dispatch({
    type: ADD_ITEM,
    payload: item,
  });
};

export const updateItem = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM,
    payload: data,
  });
};
export const deleteItem = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ITEM,
    payload: id,
  });
};

export const markAsCompleted = (data) => (dispatch) => {
  dispatch({
    type: MARK_AS_COMPLETED,
    payload: data,
  });
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
