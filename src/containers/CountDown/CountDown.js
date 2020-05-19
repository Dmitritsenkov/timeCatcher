import React, { Component } from 'react';
import Button from "../../components/Button/Button";
import "./CountDown.css";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/businessBuilder';
import MiniStopWatch from '../MiniStopWatch/MiniStopWatch';


class CountDown extends Component {

	state = {
  		timerOn: false,
      timerTime: 0,

      miniTimeStart: 0,
      miniTimerTime: 0,
	}

		startTimer = () => {

      if(this.props.businessData.miniTimerTime == 0 && this.props.businessData.timerTimeCountDown == 0){
      		this.setState({
            timerTime: 0,
            miniTimerStart: Date.now() - this.props.businessData.miniTimerTime,
            miniTimerTime: 0,
        		timerOn: true
      		});
      }
      else{
        this.setState({
          timerTime: this.props.businessData.timerTimeCountDown,
          miniTimerStart: Date.now() - this.state.miniTimerStart,
          timerOn: true
        });
      }    

	  		this.timer = setInterval(() => {

      let {timerTime} = this.state;
      let {miniTimerTime} = this.state;

      let currentCountdownTime = {
       seconds: ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2),
       minutes: ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2),
       hours: ("0" + Math.floor(timerTime / 3600000)).slice(-2)
      }
      
      let currentMiniStopwatchTime = {
       seconds: ("0" + (Math.floor(miniTimerTime / 1000) % 60)).slice(-2),
       minutes: ("0" + (Math.floor(miniTimerTime / 60000) % 60)).slice(-2),
       hours: ("0" + Math.floor(miniTimerTime / 3600000)).slice(-2)
      }  

      this.props.saveTimerTime(currentCountdownTime, timerTime, currentMiniStopwatchTime, miniTimerTime, this.props.businessData.id)

      this.setState({
        miniTimerTime: Date.now() - this.state.miniTimerStart,
      })

			}, 10);
		}

		stopTimer = () => {
   let timerTime = this.props.business[0].timerTime;
    let miniTimerTime = this.props.business[0].miniTimerTime;
        clearInterval(this.timer);
        this.setState({ timerOn: false, timerTime: timerTime,  miniTimerTime: miniTimerTime});
		}

		resetTimer = () => {
  			if (this.state.timerOn === false) {
    			this.setState({
     				timerTime: 0
   			 	});
          this.props.clearCurrentCountDownTime(this.props.businessData.id);
  			}
		}

    adjustTimer = input => {
        let index = this.props.business.findIndex((el)=>el.id==this.props.businessData.id);  
        let { timerOn } = this.state;
        let {timerTime} = this.state;
        let {miniTimerTime} = this.state;
        let max = 216000000;

        if (!timerOn) {
          if (input === "incHours" && timerTime + 3600000 < max) {
            this.setState({timerTime: timerTime + 3600000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          } else if (input === "decHours" && timerTime - 3600000 >= 0) {
            this.setState({timerTime: timerTime-3600000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          } else if (input === "incMinutes" && timerTime + 60000 < max) {
            this.setState({timerTime: timerTime+60000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
            this.setState({timerTime: timerTime-60000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          } else if (input === "incSeconds" && timerTime + 1000 < max) {
            this.setState({timerTime: timerTime+1000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
            this.setState({timerTime: timerTime-1000})
            this.props.increaseTimer(3600000, this.props.businessData.id)
          }
        }
    }


		render(){

    let timerOn = this.state.timerOn;
    let {timerTime} = this.state;    
    let {miniTimerTime} = this.state;

    let index = this.props.business.findIndex((el)=>el.id==this.props.businessData.id);  

    let seconds = this.props.business[index].currentCountdownTime.seconds;
    let minutes = this.props.business[index].currentCountdownTime.minutes;
    let hours = this.props.business[index].currentCountdownTime.hours;

    // let miniSeconds =  this.props.business[0].currentMiniStopwatchTime.seconds;
    // let miniMinutes = this.props.business[0].currentMiniStopwatchTime.minutes;
    // let miniHours = this.props.business[0].currentMiniStopwatchTime.hours;

    let countdown = null;

    let miniStopWatch = <MiniStopWatch businessData={this.props.businessData}/>

    if(this.props.isShown){
    countdown = 
      <div>
      <div className="Countdown">
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-display">
          <Button clicked={() => this.adjustTimer("incHours")}>&#8679;</Button>
          <Button clicked={() => this.adjustTimer("incMinutes")}>
            &#8679;
          </Button>
          <Button clicked={() => this.adjustTimer("incSeconds")}>
            &#8679;
          </Button>

          <div className="Countdown-time">
            <span>{hours}</span>
            <span> : &nbsp;</span>
            <span>{minutes}
            </span>
            <span> : &nbsp;</span>
            <span>{seconds}</span>
          </div>

          <Button clicked={() => this.adjustTimer("decHours")}>&#8681;</Button>
          <Button clicked={() => this.adjustTimer("decMinutes")}>
            &#8681;
          </Button>
          <Button clicked={() => this.adjustTimer("decSeconds")}>
            &#8681;
          </Button>
        <div className="Countdown-label">
          <span className="Countdown-label_hours">Hours</span>
          <span className="Countdown-label_minutes">Minutes</span>
          <span className="Countdown-label_seconds">Seconds</span>
        </div>
        </div>
        {this.state.timerOn === false && (
          <Button className="Button-start" clicked={this.startTimer}>
            Start
          </Button>
        )}
        {this.state.timerOn === true && timerTime >= 1000 && (
          <Button className="Button-stop" clicked={this.stopTimer}>
            Stop
          </Button>
        )}

            <Button className="Button-reset" clicked={this.resetTimer}>
              Reset
            </Button>

      </div>      
        {miniStopWatch}
      </div>
    }

    return (
      <div>
        {countdown}
      </div>
    );
  }
}

  const mapStateToProps = state => {
    return {
      business: state.businessList.business,
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      saveTimerTime: (currentCountdownTime, timerTimeCountDown, currentMiniStopwatchTime, miniTimerTime, id) => dispatch(actions.saveTimerTime(currentCountdownTime, timerTimeCountDown, currentMiniStopwatchTime, miniTimerTime, id)),
      increaseTimer: (increaseBy, id)=> dispatch(actions.increaseTimer(increaseBy, id)),
      clearCurrentCountDownTime: (id) => dispatch(actions.clearCurrentCountDownTime(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);