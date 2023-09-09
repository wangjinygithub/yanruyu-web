import React, { cloneElement, Children } from 'react';
import styles from './AuthComponent.less';

export default function Wrapper({type, children}) {
  const render = (children) => {
    const onlyChildren = Children.only(children);

    return cloneElement(onlyChildren, {
      style: {
        color: 'rgba(0, 0, 0, 0.45)',
      }
    })
  };

  return (
    <div className={styles.wrapper} style={{display: type === 'inline' ? 'inline-block' : 'block'}}>
      {render(children)}
      <div className={styles.mask} />
    </div>
  )
}
