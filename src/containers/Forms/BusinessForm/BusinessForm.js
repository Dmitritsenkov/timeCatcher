import React, { Component } from 'react';
import classes from './BusinessForm.module.css';
import Button from "../../../components/Button/Button";
import { connect } from 'react-redux';

import * as stopWatchActions from '../../../store/actions/stopWatch';

import { compose } from 'redux';

class BusinessForm extends Component {

  state = {
    title: '',
    goalHours: '',
  }

  titleHandler = (e) => {
    this.setState({title: e.target.value})
  }

  hoursHandler = (e, typeOfGoal) =>{

    if(typeOfGoal=='goalHours'){
        this.setState({goalHours: e.target.value})
    }
    else if(typeOfGoal=='weeklyGoalHours'){
        let newWeeklyGoal = {...this.state.weeklyGoal};
        newWeeklyGoal.hours = e.target.value;
        this.setState({weeklyGoal: newWeeklyGoal})
    }
    else if(typeOfGoal=='weeklyGoalMinutes'){
        let newWeeklyGoal = {...this.state.weeklyGoal};
        newWeeklyGoal.minutes = e.target.value;
        this.setState({weeklyGoal: newWeeklyGoal})
    }
    else if(typeOfGoal=='daylyGoalHours'){
        let newdaylyGoal = {...this.state.daylyGoal};
        newdaylyGoal.hours = e.target.value;
        this.setState({daylyGoal: newdaylyGoal})
    }
    else if(typeOfGoal=='daylyGoalMinutes'){
        let newdaylyGoal = {...this.state.daylyGoal};
        newdaylyGoal.minutes = e.target.value;
        this.setState({daylyGoal: newdaylyGoal})
    }  }

  addBusiness = () => {

    let data = {
      id: this.state.title + '_' + Math.random().toString(36).substr(2, 9),
      title: this.state.title,
      goalHours: this.state.goalHours,
      totalHours: {
            hours: 0,
            minutes: 0
          },
      description: '',
      progress: 0,
      stopWatchIsShown: true,
      isShown: true
    }
    if(this.state.title==false || this.state.goalHours==false){
      alert('Please fill out required fields');
      return false;
    }
    
    this.props.addBusiness(data);
    console.log(this.props)
    // this.props.initializeStopWatches(localStorage.getItem('userId'));
    this.props.addStopWatch(data.id)
    this.setState({title: '', goalHours: ''});
    this.closeForm();
}

  closeForm = () => {
    document.getElementById('formCover').style.display='none';
    this.props.hideBusinessForm();
  }


  render(){
    return(
      <div>
        <div className={classes.formWrapper}>
          <h1 className={classes.formTitle}>Add a new activity</h1>
          <p className={classes.formDescr}>You can add some activity and choose a goal in hours.</p>
          <span className={`${classes.label} ${classes.requiredField}`}>Title*:</span><br/>
          <input onChange={(e)=>this.titleHandler(e)} type="text" placeholder="Pogramming, Reading, Learn a new language..." value={this.state.title}/><br/>
          <span className={`${classes.label} ${classes.requiredField}`}>Goal*:</span><br/>
          <input className={classes.inputGoal} onChange={(e)=>this.hoursHandler(e, 'goalHours')} type="number" placeholder="1000" value={this.state.goalHours}/> HOURS<br/>
          <div className={classes.btnWrapper}>
          <button className={classes.addBusinessBtn} onClick={this.addBusiness}>Add</button>
          </div>       
        </div>
        <div 
          id='formCover'
          className={classes.formCover}
          onClick={this.closeForm}>
        </div>
      </div>
      )
  }

}


  const mapDispatchToProps = dispatch => {
    return{
      initializeStopWatches: (userId) => dispatch(stopWatchActions.initializeStopWatches(userId)),
      addStopWatch: (id) => dispatch(stopWatchActions.addStopWatch(id)),

    }
  }

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);
