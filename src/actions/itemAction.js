import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
} from './types';

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());

  dispatch({
    type: GET_ITEMS,
    payload: [],
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

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
