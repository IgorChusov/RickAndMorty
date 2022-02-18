import axios from "axios";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { version } from "webpack";
import { RootState } from "../reducer";
import { ICharactersData } from "./reducer";




// запрос отправлен
export const CHARACTERS_REQUEST = 'CHARACTERS_REQUEST';
export type CharactersRequestAction ={
  type: typeof CHARACTERS_REQUEST;
}
export const charactersRequest: ActionCreator<CharactersRequestAction> = () => ({
  type: CHARACTERS_REQUEST
});

// запрос успешен
export const CHARACTERS_REQUEST_SUCCESS = 'CHARACTERS_REQUEST_SUCCESS';
export type CharactersRequestSuccessAction ={
  type: typeof CHARACTERS_REQUEST_SUCCESS;
  data: ICharactersData;
  page: string;
  count: number;
}
export const charactersRequestSuccess: ActionCreator<CharactersRequestSuccessAction> = (data:ICharactersData, prevData, page, count) => ({
  type: CHARACTERS_REQUEST_SUCCESS,
  data: prevData.concat(data),
  page,
  count
});

// запрос с ошибкой

export const CHARACTERS_REQUEST_ERROR = 'CHARACTERS_REQUEST_ERROR';
export type CharactersRequestErrorAction ={
  type: typeof CHARACTERS_REQUEST_ERROR;
  error: string
}
export const charactersRequestError: ActionCreator<CharactersRequestErrorAction> = (error:string) => ({
  type: CHARACTERS_REQUEST_ERROR,
  error,
});

// запрос с фильтрации страницы

export const CHARACTERS_SET_PAGE = 'CHARACTERS_SET_PAGE';
export type CharactersSetPageAction ={
  type: typeof CHARACTERS_SET_PAGE;
  page: string
}
export const charactersSetPage: ActionCreator<CharactersSetPageAction> = (page:string) => ({
  type: CHARACTERS_SET_PAGE,
  page,
});
// очистка массива
export const CHARACTERS_DELETE_DATA = 'CHARACTERS_DELETE_DATA';
export type CharactersDeleteDataAction ={
  type: typeof CHARACTERS_DELETE_DATA;
  data: ICharactersData
}
export const charactersDeleteData: ActionCreator<CharactersDeleteDataAction> = () => ({
  type: CHARACTERS_DELETE_DATA,
  data:[]
});

export const charactersRequestAsync = () : ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  const prevPage = getState().characters.page;
  if(prevPage) {
  dispatch(charactersRequest());
  axios.get(prevPage).then((resp)=> {
    const data:ICharactersData = resp.data.results;
    const page = resp.data.info.next;
    const count = resp.data.info.count;
    dispatch(charactersRequestSuccess(data, getState().characters.data, page, count));
  }).catch((error) => {
  dispatch(charactersRequestError(String(error)));
  });
}}

