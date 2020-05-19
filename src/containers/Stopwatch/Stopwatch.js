import React, { Component } from 'react';

import Button from '../../components/Button/Button';
import classes from './Stopwatch.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/stopWatch';

class Stopwatch extends Component {

  startTimer = () => {


  if(this.props.stopWatchData.timerTime == 0){
    this.props.updateStopwatch({
      timerOn: true,
      timerStart: Date.now() - this.props.stopWatchData.timerTime
    }, this.props.stopWatchData.businessId)
  }
  else{

    this.props.updateStopwatch({
      timerOn: true,
      timerTime: this.props.stopWatchData.timerTime,
      timerStart: Date.now() - this.props.stopWatchData.timerTime
    }, this.props.stopWatchData.businessId)

  }

  this.props.saveTimerId(
    setInterval(()=> {
        this.props.updateStopwatch({
        timerTime: Date.now() - this.props.stopWatchData.timerStart,
      }, this.props.stopWatchData.businessId)
    }, 10),
    this.props.stopWatchData.businessId
  )
}

  stopTimer = () => {
   clearInterval(this.props.stopWatchData.timerId);

    this.props.updateStopwatch({
      timerOn: false,
    }, this.props.stopWatchData.businessId)
  }

  resetTimer = () => {
    if(this.props.stopWatchData.timerOn === false){
       this.props.clearStopwatch(this.props.stopWatchData.businessId);
    }
    else {
      alert('Stop timer');
    }
  }


  render() {
  let stopwatch;  
    if(this.props.business.length==0){
      stopwatch = null;
    }
    else{
  let centiseconds = this.props.stopWatchData.currentStopwatchTime.centiseconds;
	let seconds = this.props.stopWatchData.currentStopwatchTime.seconds;
	let minutes = this.props.stopWatchData.currentStopwatchTime.minutes;
	let hours = this.props.stopWatchData.currentStopwatchTime.hours;

    if(this.props.stopWatchData.stopWatchIsShown){     
      stopwatch = <div className={classes.stopwatch}>
        <div className={classes.stopwatchHeader}>Stopwatch</div>
        <p className={classes.stopwatchTime}>{hours} : {minutes} : {seconds} : {centiseconds}</p>

        {this.props.stopWatchData.timerOn === false && (
          <button className={`${classes.timerBtn} ${classes.startBtn}`} onClick={this.startTimer}>START</button>
          )}
        {this.props.stopWatchData.timerOn === true && (
          <button className={`${classes.timerBtn} ${classes.stopBtn}`} onClick={this.stopTimer}>STOP</button>
          )}
        <button className={`${classes.timerBtn}`} onClick={this.resetTimer}>RESET</button>
      </div>
    }
  }

    return (
      <div>
        {stopwatch}
      </div>
    );

  }
}

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
      stopWatches: state.stopWatch.stopWatches
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      saveCurrentStopwatchTime: (time, id, timerTime) => dispatch(actions.saveCurrentStopwatchTime(time, id, timerTime)),
      clearStopwatch: (id) => dispatch({
        type: 'CLEAR_CURRENT_STOPWATCH_TIME',
        id: id
      }),
      updateStopwatch: (obj, id) => dispatch(actions.updateStopwatch(obj, id)),
      saveTimerId: (timerId, id) => dispatch(actions.saveTimerId(timerId, id))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);

