import React from 'react';
import 'components/DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {
  console.log({props});

  const dayName = props.name;
  const spotsRemaining = props.spots;
  const setNameAction = props.setDay ? props.setDay : () => 'DayListItem clicked:' + dayName;

  const dayClassNames = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  console.log({dayClassNames});
  return (
    <li className={dayClassNames} onClick={() => setNameAction(dayName)}>
      <h2 className="text--regular">{dayName}</h2>
      <h2 className="text--light">{spotsRemaining} spots remaining</h2>
    </li>
  );
}