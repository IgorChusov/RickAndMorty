import React from 'react';
import { WidgetRickAndMorty } from '../WidgetRickAndMorty';
import styles from './containercontent.css';

export function ContainerContent() {
  return (
    <div className={styles.container}>
      <WidgetRickAndMorty />
    </div>
  );
}
