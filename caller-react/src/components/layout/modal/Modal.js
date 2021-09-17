import React, { Fragment, useEffect , useState} from "react";
import Countdown from 'react-countdown';
import Loader from "react-loader-spinner";
// import { useAxiosLoader } from './../../../plugins/axios';
import "./Modal.css";

import Overlay from "../overlay/Overlay";

export default function Modal({ show, closeModal , name, from, to, duration, status}) {

  //const [loading] = useAxiosLoader();

  const Completionist = () => <span>Your Call will be disconnected!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      closeModal(false)
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };

  const template = (
    <Fragment>
      <Overlay show={show} overlayClicked={() => closeModal(false)} />
      <div className="modal">
        <header>Could Phony - {name}
          <span className="pull-right cursor-pointer" onClick={() => closeModal(false)}>X</span>
        </header>
        {status ? (status.success ? (
          <section className="display-space-between">
            <div className="timer">
              <svg className="m-r-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#006FC4" fillRule="evenodd" d="M2.5 9a5.5 5.5 0 1011.01-.01A5.5 5.5 0 002.5 9zm11.86-5.65l-1.43 1.42A6.5 6.5 0 117.5 2.52V1.5H5.72c-.09-.22-.11-.7.05-.88A.38.38 0 016.06.5h3.88c.12 0 .22.04.3.12.15.17.13.66.04.88H8.5v1.02c1.42.11 2.7.67 3.73 1.55l1.12-1.13c.42-.42.8.1 1 .4v.01zM8.5 4.43v3.85a.87.87 0 01-.5 1.6.88.88 0 01-.5-1.6V4.85c0-.6.64-.48.98-.43h.02z" clipRule="evenodd"></path></svg>
              <Countdown date={Date.now() + (1000 * 60 * duration)} renderer={renderer} />
            </div>
            <button className="cancel" onClick={() => closeModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="#FF2744" fillRule="evenodd" d="M16.52.91c.22.22.22.58 0 .8l-1.85 1.85 1.85 1.85a.56.56 0 01-.8.8l-1.85-1.85-1.85 1.85a.56.56 0 01-.8-.8l1.86-1.85-1.85-1.85a.56.56 0 11.8-.8l1.84 1.86L15.73.9a.56.56 0 01.8 0zm-1.08 16.3c.42-.39.67-.94.66-1.52v-2.24a2.06 2.06 0 00-1.77-2.09 9.08 9.08 0 01-1.99-.5c-.75-.28-1.6-.1-2.17.47l-.65.65c-1.5-.94-2.77-2.2-3.7-3.7l.64-.65c.57-.58.75-1.43.47-2.18-.24-.64-.4-1.3-.5-1.98a2.06 2.06 0 00-2.06-1.78H2.12A2.06 2.06 0 00.07 3.94a15.41 15.41 0 002.4 6.75 15.18 15.18 0 004.66 4.67 15.4 15.4 0 006.72 2.39c.58.05 1.16-.14 1.59-.53zm-.46-3.78v2.26a.94.94 0 01-1.02.94c-2.21-.24-4.35-1-6.22-2.21a14.07 14.07 0 01-4.33-4.33 14.29 14.29 0 01-2.22-6.26.93.93 0 01.93-1.02h2.25c.48 0 .88.34.95.8.1.77.28 1.51.55 2.23.13.35.05.73-.2 1l-.96.95a.56.56 0 00-.09.67 12.56 12.56 0 004.71 4.71c.22.13.5.09.68-.09l.95-.95a.94.94 0 01.99-.21c.72.27 1.47.46 2.23.56.46.06.81.47.8.95z" clipRule="evenodd"></path></svg>
            </button>
          </section>) : (<div className="light-bg">{status.message}</div>)) : (<Loader
            className="light-bg"
            type="Puff"
            color="#2b96f1"
            height={50}
            width={50}
          />)}
        <footer>
          <div>
            <div className="label">Number</div>
            <div className="value">{from}</div>
          </div>
          <div>
            <div className="label">Dailed</div>
            <div className="value">{to}</div>
          </div>
        </footer>
      </div>
    </Fragment>
  );

  return show ? template : null;
}
