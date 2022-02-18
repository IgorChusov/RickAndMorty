import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ICharactersData } from '../../store/characters/reducer';
import { EColor, Text } from '../Text';
import styles from './modalcharacter.css';
interface IModalCharacter {
  onClose: () => void;
  data: ICharactersData;
}
export function ModalCharacter(props: IModalCharacter ) {
  const node = document.getElementById('modal-root');
  const ref = useRef<HTMLDivElement>(null);
  if(!node) return null;
  useEffect(()=> {
    function handleClickedOut (event: MouseEvent){
      if(event.target instanceof Node && !ref.current?.contains(event.target))
        props.onClose?.()
    }
    document.addEventListener('click', handleClickedOut);
    return () => {
      document.removeEventListener('click', handleClickedOut)
    }
  }, [])
  return (
    ReactDOM.createPortal((
      <div className={styles.container} ref={ref}>
          <Text className={styles.title} color={EColor.darkBlue} As='h2' size={24}> {`${props.data[0].name}`}</Text>
        <div className={styles.content}>
        <img className={styles.img} src={props.data[0].image} alt="изображение персонажа" />
        <div >
          <ul>
            <li className={styles.item}>
              <Text color={EColor.darkBlue} As='p' size={16}>{`Status: ${props.data[0].status}`}</Text>
            </li>
            <li className={styles.item}>
              <Text color={EColor.darkBlue} As='p' size={16}>{`Species: ${props.data[0].species}`}</Text>
            </li>
            <li className={styles.item}>
              <Text color={EColor.darkBlue} As='p' size={16}>{`Type: ${props.data[0].type ? props.data[0].type : '-'}`}</Text>
            </li>
            <li className={styles.item}>
              <Text color={EColor.darkBlue} As='p' size={16}>{`Gender: ${props.data[0].gender}`}</Text>
            </li>
            <li className={styles.item}>
             <Text color={EColor.darkBlue} As='p' size={16}>{`Location: ${props.data[0].location?.name}`}</Text>
            </li>
            </ul>
        </div>
        </div>
      </div>
    ), node))
}

//  {
//   "id": 361,
//   "name": "Toxic Rick",
//   "status": "Dead",
//   "species": "Humanoid",
//   "type": "Rick's Toxic Side",
//   "gender": "Male",
//   "origin": {
//     "name": "Alien Spa",
//     "url": "https://rickandmortyapi.com/api/location/64"
//   },
//   "location": {
//     "name": "Earth",
//     "url": "https://rickandmortyapi.com/api/location/20"
//   },
//   "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
//   "episode": [
//     "https://rickandmortyapi.com/api/episode/27"
//   ],
//   "url": "https://rickandmortyapi.com/api/character/361",
//   "created": "2018-01-10T18:20:41.703Z"
// },
