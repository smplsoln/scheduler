import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from 'hooks/useVisualMode';
import VISUAL_MODE from 'Constants';
import Form from './Form';


export default function Appointment(props) {
  // const title = props.time ? "Appointment at " + props.time
  //     : "No Appointments"

  console.log("Appointment props: ", props);

  const initVisualMode = props.interview ? VISUAL_MODE.SHOW : VISUAL_MODE.EMPTY;
  const {mode, transition, back} = useVisualMode(initVisualMode);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    console.log("Transition to STATUS.SAVING...");
    transition(VISUAL_MODE.STATUS.SAVING);

    console.log("Book Interview: ", interview, " for appointment", props.id);
    const bookInterviewPromise = props.bookInterview(props.id, interview);

    bookInterviewPromise.finally(() => {
      console.log("Transition to SHOW mode:", mode);
      transition(VISUAL_MODE.SHOW);
      console.log("Mode now after booking interview: ", mode);
    })

  };

  const handleAdd = () => {
    console.log("Clicked onAdd, current mode: ", {mode});
    transition(VISUAL_MODE.FORM.CREATE);
    return;
    // return props.onAdd();
  };
  const handleEdit = () => {
    console.log("Clicked onEdit, current mode: ", {mode});
    transition(VISUAL_MODE.FORM.EDIT);
    return;
    // return props.onEdit();
  };
  const handleDelete = () => {
    console.log("Clicked onDelete, current mode: ", {mode});
    console.log("Transition to STATUS.DELETING...");
    transition(VISUAL_MODE.STATUS.DELETING);

    console.log("Cancel/Delete interview in appointment: ", props.id);
    props.cancelInterview(props.id)
    .finally(() => {
      console.log("Transition to EMPTY mode:", mode);
      transition(VISUAL_MODE.EMPTY);
      console.log("Mode now after setting to EMPTY after deleting interview: ", mode);
    })
    return;
  };

  const handleCancel = () => {
    console.log("Clicked onCancel, current mode: ", {mode});
    back();
    return;
    // return props.onCancel();
  };

  const handleShowConfirm = () => {
    console.log("Transition to show Confirm dialog...");
    transition(VISUAL_MODE.CONFIRM);
    return;
  };

  return (
    <Fragment>
      <Header time={props.time}/>
      { (props.time !== "5pm") && (
          (mode === VISUAL_MODE.SHOW) ? <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onEdit={handleEdit}
              onDelete={handleShowConfirm}
            />
          : (mode === VISUAL_MODE.EMPTY) ? <Empty onAdd={handleAdd}/>
          : (mode === VISUAL_MODE.FORM.CREATE) ? <Form
              // student=""
              interviewers={props.interviewers}
              // interviewer={null}
              onSave={save}
              onCancel={handleCancel}
          />
          : (mode === VISUAL_MODE.FORM.EDIT) ? <Form
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              interviewers={props.interviewers}
              onSave={save}
              onCancel={handleCancel}
          />
          : (mode === VISUAL_MODE.STATUS.SAVING) ? <Status
              message='Saving Appointment'
              />
          : (mode === VISUAL_MODE.STATUS.DELETING) ? <Status
              message='Deleting Appointment'
          />
          : (mode === VISUAL_MODE.CONFIRM) ? <Confirm
              message='Please confirm if you want to delete appointment.'
              onCancel={handleCancel}
              onConfirm={handleDelete}
          />
          : {}
          )
      }
    </Fragment>
  );
  // return (<article className="appointment">{title}</article>);
}