import {} from 'react';
import s from './Home.module.scss';

interface props {}

function MyComponent(props: props) {
  return <div className={s.home}>Home component</div>;
}

export default MyComponent;
