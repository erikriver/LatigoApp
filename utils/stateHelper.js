import v1 from 'uuid';
import R from 'ramda';

export const getById = (state, id) => {
  const { list = {}, ids = [] } = state;
  return list[id];
}

export const insert = (state, item) => {
    const { list = {}, ids = [] } = state;
    const id = `${ids.length > 0 ? Math.max(...ids) + 1 : 0}`;
  
    return {
      list: {
        ...list,
        [id]: { id, ...item },
      },
      ids: [id, ...ids],
    };
  };
  
  export const insertWithUUID = (state, item) => {
    const { list = {}, ids = [] } = state;
    const id = v1();
  
    return {
      list: {
        ...list,
        [id]: { id, ...item },
      },
      ids: [id, ...ids],
    };
  };
  
  export const insertAllWithUUID = (state, items) => R.reduce(insertWithUUID, state, items);
  
  export const insertAll = (state, items) => R.reduce(insert, state, items);
  
  export const remove = ({ list, ids }, id) => ({
    list: R.omit([id], list),
    ids: R.reject(R.equals(id), ids),
  });
  
  export const removeId = ({ list, ids }, id) => ({
    list,
    ids: R.reject(R.equals(id), ids),
  });
  
  export const update = (state, id, props) => {
    const { list } = state;
    const item = list[id];
  
    return item ? {
      ...state,
      list: {
        ...list,
        [id]: { ...item, ...props },
      },
    } : state;
  };
  