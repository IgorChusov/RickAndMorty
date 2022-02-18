import { Reducer } from "redux";
import { CharactersDeleteDataAction, CharactersRequestAction, CharactersRequestErrorAction, CharactersRequestSuccessAction, CharactersSetPageAction, CHARACTERS_DELETE_DATA, CHARACTERS_REQUEST, CHARACTERS_REQUEST_ERROR, CHARACTERS_REQUEST_SUCCESS, CHARACTERS_SET_PAGE } from "./characters/actions";
import { charactersReducer, CharactersState } from "./characters/reducer";
export const UPDATE_COMMENT =  'UPDATE_COMMENT';
export const SET_TOKEN = 'SET_TOKEN';
export type RootState = {
  characters:  CharactersState;
}
const initialState: RootState = {
  characters: {
    loading: false,
    error: '',
    page: '',
    count: 0,
    data: []
  },
}
type CharactersAction = CharactersRequestAction 
| CharactersRequestSuccessAction 
| CharactersRequestErrorAction|
CharactersSetPageAction |
CharactersDeleteDataAction



export const rootReducer: Reducer<RootState, CharactersAction> = (state = initialState, action) => {
  switch(action.type) {
        case CHARACTERS_DELETE_DATA:
        case CHARACTERS_SET_PAGE:
        case CHARACTERS_REQUEST:
        case CHARACTERS_REQUEST_SUCCESS:
        case CHARACTERS_REQUEST_ERROR:
            return {
              ...state,
              characters: charactersReducer(state.characters, action),
            }
            default: 
            return state
  }

}
