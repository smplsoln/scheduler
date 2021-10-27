import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {

  console.log({ props });

  const days = props.days;
  const selectedDay = props.day;
  const setDay = props.setDay;
  const dayListItems = [];

  for (const day of days) {
    const dayListItem = <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={selectedDay === day.name}
      setDay={setDay}
    />
    dayListItems.push(dayListItem);
  }

  return <ul>
    {dayListItems}
  </ul>;

}