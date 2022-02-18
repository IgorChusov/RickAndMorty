import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './widgetrickandmorty.css';
import label from '../../assets/images/labelFilm.png';
import { SwiperContent } from '../SwiperContent';
import { ModalCharacter } from '../ModalCharacter';
import { useHistory } from 'react-router';
import { useDataCharacters } from '../../hooks/useDataCharacters';
import { EColor, Text } from '../Text';
import { ICharactersData } from '../../store/characters/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { charactersDeleteData, charactersRequestAsync, charactersSetPage } from '../../store/characters/actions';
interface IWidgetRickAndMorty {
  classContainer?: string;
}

export function WidgetRickAndMorty({classContainer}: IWidgetRickAndMorty) {
  let history = useHistory();
  const page = useSelector<RootState, string>(state => state.characters.page);
  const dispatch = useDispatch();
  const [openModal, setOpenModal]= useState(false);
  // inputValue
  const [inputNameValue, setInputNameValue]= useState('');
  const [inputStatusValue, setInputStatusValue]= useState('');
  const [inputSpeciesValue, setInputSpeciesValue]= useState('');
  const [inputTypeValue, setInputTypeValue]= useState('');
  const [inputGenderValue, setInputGenderValue]= useState('');
  const [dataCharacter, setDataCharacter] = useState<ICharactersData>([]);
  // const {data, loading, error} = useDataCharacters();
  const data = useSelector<RootState, ICharactersData>(state => state.characters.data);
  const loading = useSelector<RootState, boolean>(state => state.characters.loading);
  const error = useSelector<RootState, string>(state => state.characters.error);
  const count = useSelector<RootState, number>(state => state.characters.count);
  const handleClickSlide = (id: number)=>{
  const newData = data.filter((elem)=>{
    return id === elem.id
  })
  setDataCharacter(newData)
  setOpenModal(true);
 }
const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
  setInputNameValue(e.target.value);
}
const handleChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
  setInputStatusValue(e.target.value)
}
const handleChangeSpecies = (e:ChangeEvent<HTMLInputElement>) => {
  setInputSpeciesValue(e.target.value)
}
const handleChangeType = (e:ChangeEvent<HTMLInputElement>) => {
  setInputTypeValue(e.target.value)
}
const handleChangeGender = (e:ChangeEvent<HTMLInputElement>) => {
  setInputGenderValue(e.target.value)
}

useEffect(()=>{
  if (!inputNameValue && !inputStatusValue && !inputSpeciesValue && !inputGenderValue && !inputTypeValue ) {
    dispatch(charactersSetPage(`https://rickandmortyapi.com/api/character?page=1`));
    dispatch(charactersDeleteData());
    dispatch(charactersRequestAsync());
  } 
  else {
    if(!loading) {
      let stringAddress = `https://rickandmortyapi.com/api/character?page=1`+ 
    `${inputNameValue ? `&name=${inputNameValue}`: ''}` + 
    `${inputStatusValue ? `&status=${inputStatusValue}`: ''}` +
    `${inputSpeciesValue ? `&species=${inputSpeciesValue}`: ''}` +
    `${inputGenderValue ? `&gender=${inputGenderValue}`: ''}`+
    `${inputTypeValue ? `&type=${inputTypeValue}`: ''}`;
      dispatch(charactersDeleteData());
      dispatch(charactersSetPage(stringAddress));
      dispatch(charactersRequestAsync())
    }
  }
},[inputNameValue,inputStatusValue,inputSpeciesValue,inputGenderValue,inputTypeValue])

  return (
    <div className={`${styles.container} ${classContainer}`}>
      <div className={styles.header}>
        <img className={styles.img} src={label} alt="Rick and Morty" />
        <form className={styles.form} action="">
          <div className={styles.inputGroup}>
            <label  className={styles.label}  htmlFor="inputName">Filter by name</label>
            <input className={styles.input} onChange={handleChangeName} id='inputName' value={inputNameValue} type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="inputStatus">Filter by status</label>
            <input className={styles.input} onChange={handleChangeStatus} id='inputStatus' value={inputStatusValue} type="text" />
          </div>
          <div className={styles.inputGroup}>  
            <label className={styles.label} htmlFor="inputSpecies">Filter by species</label>
            <input className={styles.input} onChange={handleChangeSpecies} id='inputSpecies' value={inputSpeciesValue} type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="inputType">Filter by type</label>
            <input className={styles.input} onChange={handleChangeType} id='inputType' value={inputTypeValue} type="text" />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="inputGender">Filter by gender</label>
            <input className={styles.input} onChange={handleChangeGender} id='inputGender' value={inputGenderValue} type="text" />
          </div>
        </form>
  
      </div>
      <div className={styles.containerSwiper}>
         <SwiperContent onClickSlide={handleClickSlide} list={data} />
         <div className={styles.statusInfoText}>
            {loading && (
              <Text color={EColor.grayC4} As='p' className={styles.textInfo} size={24}>Загрузка</Text>
              )}
             {data && error && (
              <Text As='p' className={styles.textInfo} size={20}>{error}</Text>
              )}  
          </div>
      </div>
      <Text As='p' className={styles.count} size={20}>{`Number of characters: ${count}`}</Text>
      {openModal && (
        <ModalCharacter data={dataCharacter} onClose={()=>{setOpenModal(false); history.push('/')}} />
    )}
    </div>
  );
}
