import React from 'react';


export default function Header(props) {
  const title = props.time && props.time;
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{title}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}