import { persistStore } from 'redux-persist';
import {createStore,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import devToolsEnhancer from 'remote-redux-devtools';

const enhancer = compose(
    applyMiddleware(thunk),
    devToolsEnhancer({ realtime: true }),
);
  
const configureStore = () => {
    const store = createStore(
      reducer,
      undefined,
      enhancer,
    );
  
    const persistor = persistStore(store);
    // persistor.purge();
    return { persistor, store };
  };
  
  export const { persistor, store } = configureStore();