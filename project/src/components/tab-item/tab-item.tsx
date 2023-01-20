import React from 'react';
import {Tab} from '../../const';

type Props = {
  isActive: boolean;
  onClick: (tabType: Tab) => void;
  tabType: Tab;
}


const TabItem: React.FC<Props> = (props) => {
  const {isActive, onClick, tabType} = props;

  return (
    <li className={`film-nav__item ${isActive ? 'film-nav__item--active' : ''}`}>
      <a className="film-nav__link" onClick={
        (event) =>
        {
          event.preventDefault();
          onClick(tabType);
        }
      }
      >
        {tabType}
      </a>
    </li>
  );
};

export default TabItem;
