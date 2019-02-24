import R from 'ramda';
import { handleActions } from 'redux-actions';
import { insert, insertAll, update, removeId} from '../../utils/stateHelper';
import { defaultCategories } from '../../constants/Categories';
import types from './types';

const createCategory = (props) => {
  const {
    name,
    icon,
    type,
    parentId = 0,
    isIncome = true,
    usedTimes = 0
  } = props;

  return {
    name,
    icon,
    type,
    isIncome,
    parentId,
    usedTimes
  };
};

let initialState = {};
R.map(item=>{
  initialState = insert(initialState,createCategory(item));
  if(item.children){
    const parentId = initialState.ids[0];
    R.map(child=>{
      child.parentId = parentId;
      initialState = insert(initialState,createCategory(child));
    }, item.children)
  }
}, defaultCategories);

const categoriesReducer = handleActions({
[types.ADD]: (state, { payload }) => insert(state, createCategory(payload)),
[types.UPDATE]: (state, { payload }) => update(state, payload.id, payload),
[types.REMOVE]: (state, { payload }) => removeId(state, payload),
[types.RESET]: state => state = initialState,
}, initialState);

export default categoriesReducer;