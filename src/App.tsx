import React from "react";
import {hot} from 'react-hot-loader/root'
import { Layout } from "./shared/Layout";
import './main.global.css'
import { YMaps} from 'react-yandex-maps';
import { applyMiddleware, createStore } from "redux";
import { Provider } from 'react-redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./store/reducer";
import { ContainerContent } from "./shared/ContainerContent";
import thunk from "redux-thunk";


const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));


 function AppComponent(){
  return(
     <Provider store={store}>
       <YMaps> 
        <Layout>
          <ContainerContent />
        </Layout>
       </YMaps> 
       </Provider>
  );
}

export const App = hot(() => <AppComponent />)
