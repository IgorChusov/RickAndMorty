import React from 'react';
import styles from './text.css';
import classNames from 'classnames'
export enum EColor {
  black = 'black',
  white = 'white',
  grayC4 = 'grayC4',
  darkBlue = 'darkBlue',
  greenNormal = 'greenNormal',
  greenBright =  'greenBright',
  yellow = 'yellow',
  deepskyblue= 'deepskyblue',
}
type TSizes = 28 | 24 | 20 | 16 |14 |12 | 10;

interface ITextProps{
  As?:'span' | 'h1'| 'h2'| 'h3' | 'h4' | 'p'| 'div';
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabledSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColor;
  bold?: boolean;
  className?: string
}
export function Text(props:ITextProps) {
  const {
    As = 'span', 
    children, 
    size, 
    mobileSize, 
    tabledSize,
    desktopSize, 
    color= EColor.black,
    bold = false,
    className
  } = props;
  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    {[styles.bold]: bold},
    {[styles[`m${mobileSize}`]]:mobileSize},
    {[styles[`t${tabledSize}`]]:tabledSize},
    {[styles[`d${desktopSize}`]]:desktopSize},
    className,
  )
  return (
    <As className={classes}>
      {children}
    </As>
  );
}
