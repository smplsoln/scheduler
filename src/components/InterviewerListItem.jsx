import React from 'react';
// import {useState} from 'react';
import classNames from 'classnames';

// import "InterviewerListItem.scss";

import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {

  console.log({props});
  const id = props.id;
  const avatar = props.avatar;
  const selected = props.selected;
  const name = props.selected ? props.name : "";
  const handleClick = props.setInterviewer
    ? (() => {
      const retVal = props.setInterviewer(id);
      console.log("setInterviewer: ", id, " return: ", retVal);
      return retVal;
    })
    : (() => {
      console.log("Interviewer selected: ", {id});
      return id;
    });

  const itemClasses = classNames("interviewers__item ", {
    "interviewers__item--selected": selected,
  })

  console.log({itemClasses});
  return <li className={itemClasses} key={id} onClick={handleClick}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>;
}