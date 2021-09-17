import React, { Fragment, useState } from 'react';
import { Button } from '../../components/layout/button/Button'
import { useHistory } from "react-router-dom"; 
import  Modal  from '../../components/layout/modal/Modal';
import  utlity  from '../../helpers/utitlity';
import  { _axios }  from '../../plugins/axios';

import './Plivo.css';
const Plivo = () => {
  const history = useHistory();
  const [duration, setDuration] = useState(5);
  const num = [1, 5, 10, 15];
  const [name, setName] = useState('');  
  const [from, setFrom] = useState('');  
  const [to, setTo] = useState('');  
  const [payload, setPayload] = useState({});
  const [connectionStatus, setConnectionStatus] = useState('');

  const submit = e => {
    e.preventDefault();
    setPayload({name, from, to, duration});
    openModal();
    _axios.post('/v1/call/connect', {name, from, to, duration})
      .then((response) => {
        if(response.data && response.data.success){
          setConnectionStatus({success: 1, requestId: response.data.requestUuid, message: response.message})
        } else {
          setConnectionStatus({success: 0, message: 'Could not connect your call :('})
        }
      }).catch((error) => {
        console.log(error)
        setConnectionStatus({success: 0, message: error.response.data ? error.response.data.message : error.message})
    })
    // history.push("/");
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = (confirm) => {
    if(connectionStatus && connectionStatus.requestId){
      _axios.post('/v1/call/disconnect', {requestId: connectionStatus.requestId})
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
    setConnectionStatus('');
    setShowModal(false);
  };

  return (
    <Fragment>
    <form onSubmit={submit} className="plivo-form" autoComplete="off">
      <div className="full-width">
        <div className="form-header">
          Mak an Outbound Call
        </div>
        <div className="form-content">
          <div className="m-b-20 input-group">
            <div className="input-wrapper">
              
              <input
                className="input-box full-width"
                type="text"
                placeholder=" "
                name="name"
                required
                autoComplete="off"
                onChange={e => setName(e.target.value)}
              />
              <label className="placeholder" htmlFor="name">Enter Name</label>
            </div>
            <img src="/assets/user.png" alt="user" height="25" className="m-l-10"/>
          </div>
          <div className="m-b-20 input-group">
            <strong className="m-r-10">+91</strong>
            <div className="input-wrapper">
              <input
                className="input-box full-width"
                type="tel"
                placeholder=" "
                name="phone"
                required
                onKeyPress={e => utlity.integerchk(e)}
                onChange={e => setFrom('+91' + e.target.value)}
              />
              <label className="placeholder" htmlFor="phone">Enter From Number</label>
            </div>
            <img src="/assets/phone.png" alt="phone" height="25" className="m-l-10"/>
          </div>
          <div className="m-b-20 input-group">
            <strong className="m-r-10">+91</strong>
            <div className="input-wrapper">
              <input
                className="input-box full-width"
                type="tel"
                placeholder=" "
                name="call"
                required
                onKeyPress={e => utlity.integerchk(e)}
                // value={to}
                onChange={e => setTo('+91' + e.target.value)}
              />
              <label className="placeholder" htmlFor="call">Enter To Number</label>
            </div>
            <img src="/assets/call.png" alt="call" height="25" className="m-l-10"/>
          </div>
          <div className="m-b-20 input-group">
            <div className="input-wrapper">
              <label className="" htmlFor="duration">Select Duration (Minutes)</label>
              <select name="duration" value={duration} className="m-l-10 input-box" onChange={(e)=>setDuration(parseInt(e.target.value))}>
                {num.map(function(n, i) { 
                    return (<option key={i} value={n} defaultValue={duration === n}>{n}</option>);
                })}
              </select>
            </div>
            <img src="/assets/stop-watch.png" alt="call" height="25" className="m-l-10"/>
          </div>
        </div>
        <div className="form-footer">
          <Button type="submit" text='Call Now'/>
        </div>
      </div>
    </form>
    {showModal ? <Modal show={showModal} closeModal={closeModal} status={connectionStatus} {...payload}/> : ''}
    
    </Fragment>
  );
};

export default Plivo;