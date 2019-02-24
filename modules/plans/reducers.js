import { handleActions } from "redux-actions";
import {
  insert,
  insertAll,
  update,
  removeId,
  getById,
  remove
} from "../../utils/stateHelper";
import types from "./types";
import PlanTypes from "../../constants/PlanTypes";

const createPlan = props => {
  const {
    value,
    account,
    category,
    fromDate = new Date(),
    toDate = new Date(),
    note,

    //Extra information
    reminder,
    repeat = false,

    //Plan type
    type = PlanTypes.Budget
  } = props;

  return {
    value,
    account,
    category,
    fromDate,
    toDate,
    note,
    reminder,
    repeat,
    type
  };
};

const initialState = insertAll({}, []);

const plansReducer = handleActions(
  {
    [types.ADD]: (state, { payload }) => insert(state, createPlan(payload)),
    [types.UPDATE]: (state, { payload }) => update(state, payload.id, payload),
    [types.REMOVE]: (state, { payload }) => remove(state, payload),
    [types.RESET]: state => (state = initialState)
  },
  initialState
);

export default plansReducer;
