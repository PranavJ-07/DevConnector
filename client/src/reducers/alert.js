import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function alert(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case SET_ALERT:
      return [...state, payload]; // action.payload is the new alert, we want to add it to the existing array of alerts
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); // action.payload is the id of the alert we want to remove, we want to return a new array of alerts that does not include the alert with the id that we want to remove
    default:
      return state;
  }
}
