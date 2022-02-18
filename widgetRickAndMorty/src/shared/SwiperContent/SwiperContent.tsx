import React, { MouseEventHandler, useRef, useState } from 'react';
import styles from './swipercontent.css';
import {Swiper, SwiperSlide} from "swiper/react"; 
import SwiperCore, {Navigation} from 'swiper';
import { Link } from 'react-router-dom';
import { EColor,Text } from '../Text';
import { ICharactersData } from '../../store/characters/reducer';
import { useDispatch } from 'react-redux';
import { charactersRequestAsync } from '../../store/characters/actions';
interface ISwiperContent {
 list: ICharactersData;
 onClickSlide: (id: number) => void;
}
SwiperCore.use([Navigation]);

export function SwiperContent(props: ISwiperContent) {
  const dispatch = useDispatch();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <div className={styles.content}>
      <Swiper  

    spaceBetween={8}
  
    navigation={{
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,}
    }
    onBeforeInit={(swiper) => {
      // @ts-ignore
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      // @ts-ignore
      swiper.params.navigation.nextEl = navigationNextRef.current;
 }}
    onSlideChangeTransitionEnd={(swiper)=>{
      if(swiper.isEnd) {
        dispatch(charactersRequestAsync())
      }
    }}
    className={styles.swiper}
    breakpoints={{
      // when window width is >= 480px
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
        
      },
      590: {
        slidesPerView: 2,
        slidesPerGroup: 2
        
      },
      // when window width is >= 640px
      780: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1024: {
        slidesPerView: 5,
        slidesPerGroup: 5
      }
    }
    }
   >  
       {props.list.map((elem, index)=>{
         return (
           <SwiperSlide  className={styles.slide} key={elem.id}>
               <div className={styles.containerImg}>
                 <img className={styles.img} src={elem.image} alt="Товар" />
               </div>
               <div className={styles.slideContent}>
                 <Text color={EColor.darkBlue} className={styles.cardTitle} size={20} As='h3'>{`${elem.name}`}</Text>
                 <Text color={EColor.darkBlue} className={styles.cardInfo} size={20} As='p'>{`status: ${elem.status}`}</Text>
               </div>
               <Link onClick={()=>{elem.id?props.onClickSlide(elem.id): null}} className={styles.link} to={`/pageCharacter/name=${elem.name?.split(' ').join('')}/id=${elem.id}`}></Link>
           </SwiperSlide>
     )
   })
   }
      </Swiper>
      <button className={`${styles.button} ${styles.buttonPrev}`} ref={navigationPrevRef}>
        <svg viewBox="4 0 8 16" width="12" height="16">
        <path d="M4.3,8.7l6,5.9c0.4,0.4,1.1,0.4,1.5,0c0.4-0.4,0.4-1.1,0-1.5L6.5,8l5.2-5.2c0.4-0.4,0.4-1.1,0-1.5
        c-0.4-0.4-1.1-0.4-1.5,0l-6,6C3.9,7.7,3.9,8.3,4.3,8.7z"></path>
        </svg>
      </button>
      <button className={`${styles.button} ${styles.buttonNext}`} ref={navigationNextRef}>
        <svg viewBox="4 0 8 16" width="12" height="16">
          <path d="M11.7,7.3l-6-5.9c-0.4-0.4-1.1-0.4-1.5,0c-0.4,0.4-0.4,1.1,0,1.5L9.5,8l-5.2,5.2
              c-0.4,0.4-0.4,1.1,0,1.5c0.4,0.4,1.1,0.4,1.5,0l6-6C12.1,8.3,12.1,7.7,11.7,7.3z">
          </path>
        </svg>
      </button>
   </div>
  );
}
