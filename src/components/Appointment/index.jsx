import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from 'hooks/useVisualMode';
import VISUAL_MODE from 'Constants';
import Form from './Form';


export default function Appointment(props) {
  // const title = props.time ? "Appointment at " + props.time
  //     : "No Appointments"

  const initVisualMode = props.interview ? VISUAL_MODE.SHOW : VISUAL_MODE.EMPTY;
  const {mode, transition, back} = useVisualMode(initVisualMode);

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
    transition(VISUAL_MODE.DELETE);
    return;
    // return props.onDelete();
  };

  const handleCancel = () => {
    console.log("Clicked onCancel, current mode: ", {mode});
    back();
    return;
    // return props.onCancel();
  };

  return (
    <Fragment>
      <Header time={props.time}/>
      { (props.time !== "5pm") && (
          (mode === VISUAL_MODE.SHOW) ? <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          : (mode === VISUAL_MODE.EMPTY) ? <Empty onAdd={handleAdd}/>
          : (mode === VISUAL_MODE.FORM.CREATE) ? <Form
              // student=""
              interviewers={props.interviewers}
              // interviewer={null}
              onSave={props.onSave}
              onCancel={handleCancel}s
          />
          : (mode === VISUAL_MODE.FORM.EDIT) ? <Form
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              interviewers={props.interviewers}
              onSave={props.onSave}
              onCancel={handleCancel}
          />
          : {}
          )
      }
    </Fragment>
  );
  // return (<article className="appointment">{title}</article>);
}