import { Reducer } from "react";
import { charactersDeleteData, CharactersDeleteDataAction, CharactersRequestAction, CharactersRequestErrorAction, CharactersRequestSuccessAction, CharactersSetPageAction, CHARACTERS_DELETE_DATA, CHARACTERS_REQUEST, CHARACTERS_REQUEST_ERROR, CHARACTERS_REQUEST_SUCCESS, CHARACTERS_SET_PAGE } from "./actions";

export type ICharactersData = {
  id?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: {
      name: string;
      url: string;
  };
  location?: {
      name: string;
      url: string;
  };
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}[]

export type CharactersState = {
  loading: boolean,
  error: string,
  page: string,
  count: number,
  data: ICharactersData,
}

type CharactersActions = CharactersRequestAction 
| CharactersRequestSuccessAction 
| CharactersRequestErrorAction
| CharactersSetPageAction
| CharactersDeleteDataAction;

export const charactersReducer: Reducer<CharactersState, CharactersActions> = (state, action) => {
  switch(action.type) {
    case CHARACTERS_DELETE_DATA:
      return {
        ...state,
       data: action.data,
      }
    case CHARACTERS_SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    case CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
      case CHARACTERS_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
      case CHARACTERS_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          page: action.page,
          data: action.data, 
          error: '',
          count: action.count 
        }
      default:
        return state
  }
}
