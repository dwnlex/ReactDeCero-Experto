import { useState } from 'react';
import type { Props } from './Props';


import styles from './ItemCounter.module.css';

/* import './ItemCounter.css'; */

export const ItemCounter = ({ name, quantity = 1 }: Props) => {
  const [count, setCount] = useState(quantity);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  /*  const handlerClick = () => {
    console.log(`Click en ${name}`);
  }; */

  return (
    <section
      className={styles.itemRow}
      /* style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
      }} */
    >
      <span className={styles.itemText} style={{  color: count === 1 ? 'red' : 'black' }}>
        {' '}
        {name}
      </span>
      <button
        onMouseEnter={() => {
          console.log(`Mouse enter ${name}`);
        }}
        /*         
        onClick={(event) => {
          console.log(event);
          console.log(`Click ${name}`);
        }} */
        onClick={handleAdd}
      >
        +1
      </button>
      <span>{count}</span>
      <button onClick={handleSubtract}>-1</button>
    </section>
  );
};

export default ItemCounter;
