import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { charactersRequestAsync } from '../store/characters/actions';
import { ICharactersData } from '../store/characters/reducer';
import { RootState } from '../store/reducer';

export function useDataCharacters () {
  const dispatch = useDispatch();
  const error = useSelector<RootState, string>(state => state.characters.error);
  const address = useSelector<RootState, string>(state => state.characters.page);
  const loading = useSelector<RootState, boolean>(state => state.characters.loading);
  const data = useSelector<RootState, ICharactersData>(state => state.characters.data);
  useEffect(()=> {
    dispatch(charactersRequestAsync())
  },[]);
  return {
    data,
    loading,
    error
  }
}
