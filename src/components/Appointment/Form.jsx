import React from 'react';
import { useState } from 'react';

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const ERROR_MSG_STUDENT_NAME_CANNOT_BE_BLANK = "Student name cannot be blank";
  const ERROR_MSG_INTERVIEWER_MUST_BE_SELECTED = "Interviewer must be selected!";

  console.log("Form props: ", {props});
  const studentName = props.student ? props.student : "";
  const interviewers = props.interviewers;
  const selectedInterviewer = props.interviewer || null;

  const [error, setError] = useState("");

  const [formState, setFormState] = useState({ interviewers: interviewers, interviewer: selectedInterviewer, student: studentName });
  console.log("Form state: ", {formState});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // uncomment below to allow form onSave on Enter/Submit
    // handleSave();
  };

  const handleSave = (event) => {
    // console.log("Form Save event: ", event);
    let student = formState.student;
    let interviewer = formState.interviewer;

    if (student === "") {
      setError(ERROR_MSG_STUDENT_NAME_CANNOT_BE_BLANK);
      return;
    }

    if (!interviewer || !interviewer.id) {
      setError(ERROR_MSG_INTERVIEWER_MUST_BE_SELECTED);
      return;
    }

    // validation passed so clear any prev error from error state
    setError("");

    console.log("Calling onSave: ", props.onSave, " with args: ", student, " and interviewer: ", interviewer);
    return props.onSave(student, interviewer);
  };

  const handleCancel = (event) => {
    setError("");
    setFormState({ ...formState, student: "" });
    return props.onCancel(event);
  };

  const handleInputChange = (event) => {

    const studentNameInput = event.target.value;
    console.log({ studentNameInput })
    setFormState({ ...formState, student: studentNameInput });
    // clear prev error if some value is set to student name input
    if(error === ERROR_MSG_STUDENT_NAME_CANNOT_BE_BLANK
      && formState.student) {
      setError("");
    }
  };

  const getInterviewerForId = (state, id) => {
    for (const interviewer of state.interviewers) {
      if (id === interviewer.id) {
        return interviewer;
      }
    }
  }

  const setInterviewer = (updatedInterviewer) => {
    if(error === ERROR_MSG_INTERVIEWER_MUST_BE_SELECTED) {
      setError("");
    }
    console.log("set interviewer: ", updatedInterviewer);
    const selectedInterviewer = getInterviewerForId(formState, updatedInterviewer);
    console.log("Interviewer selected: ", selectedInterviewer);
    setFormState({ ...formState, interviewer: selectedInterviewer})
    // clear prev error if some value is set to student name input
  };

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* <form autoComplete="off" onkeydown="return event.key = 'Enter';"> */}
        <form autoComplete="off" onSubmit={handleFormSubmit}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={formState.student}
            placeholder="Enter Student Name"
            required
            onChange={handleInputChange}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={formState.interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={handleCancel} >Cancel</Button>
          <Button confirm onClick={handleSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}