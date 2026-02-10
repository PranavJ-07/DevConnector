import { SET_ALERT, REMOVER_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// dispatch an alert with a unique id, then remove it after 5 seconds
// alertType can be 'success', 'danger', etc. to determine the color of the alert
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
