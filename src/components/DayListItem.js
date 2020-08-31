import React from 'react';
import classnames from 'classnames';

import './DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  const formatSpots = (spots) => {
    if (spots > 1) {
      return `${spots} spots remaining`;
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `no spots remaining`;
    }
  }

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}
