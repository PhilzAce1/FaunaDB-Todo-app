/**=====================ACTION TYPES========================== */
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  UPDATE_ITEM,
} from './types';

//-------------------SERVER ACTIONS --------------------------------------
import {
  CreateTodo,
  DeleteTodo,
  GetAllTodo,
  UpdateTodo,
} from '../server/index';

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
  CreateTodo(item.name).then((res) => {
    dispatch({
      type: ADD_ITEM,
      payload: item,
    });
  });
};

export const updateItem = (data) => (dispatch) => {
  const { id, name } = data;
  UpdateTodo(id, name)
    .then((res) => {
      dispatch({
        type: UPDATE_ITEM,
        payload: res,
      });
    })
    .catch(console.error);
};
export const deleteItem = (id) => (dispatch, getState) => {
  DeleteTodo(id)
    .then((res) => {
      dispatch({
        type: DELETE_ITEM,
        payload: res,
      });
    })
    .catch(console.log);
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
