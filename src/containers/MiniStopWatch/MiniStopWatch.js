import React, { Component } from 'react';
import classes from './MiniStopWatch.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/businessBuilder';

class MiniStopWatch extends Component {

  render() {

    let hours = this.props.businessData.currentMiniStopwatchTime.hours;
    let minutes = this.props.businessData.currentMiniStopwatchTime.minutes;
    let seconds = this.props.businessData.currentMiniStopwatchTime.seconds;

      
    return (
      <div className={classes.miniStopwatchWraper}>
        <p className={classes.stopwatchTime}>{hours}h : {minutes}m : {seconds}s</p>
      </div>
    );

  }
}

  // const mapStateToProps = state => {
  //   return {
  //     business: state.businessList.business,
  //   }
  // }

  // const mapDispatchToProps = dispatch => {
  //   return{
  //     saveCurrentMiniStopwatchTime: (time, id, timerTime) => dispatch(actions.saveCurrentMiniStopwatchTime(time, id, timerTime)),
  //   }
  // }


export default MiniStopWatch;
