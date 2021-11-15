import React from 'react';
// import {useState} from 'react';
import classNames from 'classnames';

import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {

  console.log("InterviewerListItem props", {props});
  const avatar = props.avatar;
  const selected = props.selected;
  const name = props.selected ? props.name : "";

  const itemClasses = classNames("interviewers__item ", {
    "interviewers__item--selected": selected,
  })

  console.log({itemClasses});
  return <li className={itemClasses} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={props.name ? props.name : ""}
      />
      {name}
    </li>;
}