import React from 'react';

import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss";

function InterviewerList(props) {

  console.log("InterviewerList props", {props});
  const interviewerListItems = [];


  for (const interviewer of props.interviewers) {
    let isSelected = (interviewer) && (props.value) ? props.value.id === interviewer.id : false;
    interviewerListItems.push(<InterviewerListItem
      key = {interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={isSelected}
      setInterviewer={() => props.onChange(interviewer.id)}
    />);
  }

  return <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list"> {interviewerListItems} </ul>
  </section>
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;