import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from 'hooks/useVisualMode';
import VISUAL_MODE from 'Constants';
import Form from './Form';


export default function Appointment(props) {

  console.log("Appointment props: ", props);

  const initVisualMode = props.interview ? VISUAL_MODE.SHOW : VISUAL_MODE.EMPTY;
  const {mode, transition, back} = useVisualMode(initVisualMode);

  const save = (name, interviewer) => {

    if(!name) {
      console.log("Name cannot be empty!");
      transition(VISUAL_MODE.ERROR_NAME_EMPTY);
      return;
    }
    if(!interviewer || !interviewer.id) {
      console.log("Interviewer has to be selected!");
      transition(VISUAL_MODE.ERROR_INTERVIEWER_NOT_SELECTED);
      return;
    }

    const interview = {
      student: name,
      interviewer: interviewer.id
    };

    console.log("Transition to STATUS.SAVING...");
    transition(VISUAL_MODE.STATUS.SAVING);

    console.log("Book Interview: ", interview, " for appointment", props.id);
    props.bookInterview(props.id, interview)
      .then(() => {
        console.log("Transition to SHOW mode:", mode);
        transition(VISUAL_MODE.SHOW, true);
        console.log("Mode now after booking interview: ", mode);
      })
      .catch(err => {
        console.error("Error saving interview appointment.", err);
        transition(VISUAL_MODE.ERROR_SAVE, true);
      })
      .finally(() => {
        console.log("Completed Saving flow.");
      });
  };

  const handleSaveErrorClose = () => {
    console.log("Handle close of saving error dialog.");
    back();
  };

  const handleNameErrorClose = () => {
    console.log("Handle close of saving error dialog.");
    back();
  };

  const handleInterviewerErrorClose = () => {
    console.log("Handle close of saving error dialog.");
    back();
  };

  const handleAdd = () => {
    console.log("Clicked onAdd, current mode: ", {mode});
    transition(VISUAL_MODE.FORM.CREATE);
    return;
  };
  const handleEdit = () => {
    console.log("Clicked onEdit, current mode: ", {mode});
    transition(VISUAL_MODE.FORM.EDIT);
    return;
  };
  const handleDelete = () => {
    console.log("Clicked onDelete, current mode: ", {mode});
    console.log("Transition to STATUS.DELETING...");
    transition(VISUAL_MODE.STATUS.DELETING, true);

    console.log("Cancel/Delete interview in appointment: ", props.id);
    props.cancelInterview(props.id)
      .then(() => {
        console.log("Transition to EMPTY mode:", mode);
        transition(VISUAL_MODE.EMPTY, true);
        console.log("Mode now after setting to EMPTY after deleting interview: ", mode);
      })
      .catch(err => {
        console.error("Error deleting interview appointment.", err);
        transition(VISUAL_MODE.ERROR_DELETE, true);
      })
      .finally(() => {
        console.log("Completed delete flow.");
      });
    return;
  };

  const handleDeleteErrorClose = () => {
    console.log("Handle close of delete error dialog.");
    back();
  };

  const handleCancel = () => {
    console.log("Clicked onCancel, current mode: ", {mode});
    back();
    return;
    // return props.onCancel();
  };

  const handleConfirmDelete = () => {
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
              onDelete={handleConfirmDelete}
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
          : (mode === VISUAL_MODE.ERROR_SAVE) ? <Error
              message='Error saving interview appointment!'
              onClose={handleSaveErrorClose}
          />
          : (mode === VISUAL_MODE.ERROR_DELETE) ? <Error
              message='Error deleting interview appointment!'
              onClose={handleDeleteErrorClose}
          />
          : (mode === VISUAL_MODE.ERROR_NAME_EMPTY) ? <Error
              message='Error: Name cannot be empty!'
              onClose={handleNameErrorClose}
          />
          : (mode === VISUAL_MODE.ERROR_INTERVIEWER_NOT_SELECTED) ? <Error
              message='Error: Interviewer must be selected!'
              onClose={handleInterviewerErrorClose}
          />
          : {}
          )
      }
    </Fragment>
  );
  // return (<article className="appointment">{title}</article>);
}