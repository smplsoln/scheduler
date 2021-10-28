import React from 'react';
import { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const studentName = props.student ? props.student : "";
  const interviewers = props.interviewers;
  const selectedInterviewer = props.interviewer;

  const [formState, setFormState] = useState({ interviewer: selectedInterviewer, student: studentName });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // uncomment below to allow form onSave on Enter/Submit
    // handleSave();
  };

  const handleSave = () => {
    let studentInput = formState.student;
    let interviewerId = formState.interviewer;

    return props.onSave(studentInput, interviewerId);
  };

  const handleCancel = () => {
    setFormState({});
    return props.onCancel();
  };

  const handleInputChange = (event) => {
    const studentNameInput = event.target.value;
    console.log({ studentNameInput })
    setFormState({ ...formState, student: studentNameInput });
  };

  const setInterviewer = (updatedInterviewer) => {
    console.log({ updatedInterviewer });
    setFormState({ ...formState, interviewer: updatedInterviewer })
  };

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* <form autoComplete="off" onkeydown="return event.key = 'Enter';"> */}
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={formState.student}
            placeholder="Enter Student Name"
            onChange={handleInputChange}
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={formState.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel} >Cancel</Button>
          <Button confirm onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}