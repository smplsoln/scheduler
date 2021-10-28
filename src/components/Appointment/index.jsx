import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  const title = props.time ? "Appointment at " + props.time
      : "No Appointments"

  return (
    <Fragment>
      <Header time={props.time}/>
      { (props.time !== "5pm" ) &&
          (props.interview
            ? <Show
                student={props.interview.student}
                interviewer={props.interview.interviewer}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
            />
            : <Empty onAdd={props.onAdd}/>)
      }
    </Fragment>
  );
  // return (<article className="appointment">{title}</article>);
}