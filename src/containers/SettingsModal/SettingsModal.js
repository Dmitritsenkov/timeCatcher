import React, { Component } from 'react';
import classes from './settingsModal.module.css';

import { connect } from 'react-redux';
import * as businessBuilderActions from '../../store/actions/businessBuilder';
import * as stopWatchActions from '../../store/actions/stopWatch';

class SettingsModal extends Component {

    state = {
      newData:{
        title: this.props.businessData.title,
        goal: this.props.businessData.goalHours
      },
      isShowSavingPopUpMessage: false
    }



	deleteHandler = () => {
		this.props.deleteBusiness(this.props.businessData.id);
    document.getElementById('popUpContainer').style.display="none";
    document.getElementById('settingsModal').style.opacity='1';
    document.getElementById('formCover2').style.display="none";
	}

	showRemovePopUp = () => {
    let index = this.props.stopWatch.findIndex((el=>el.businessId==this.props.businessData.id)) 
    if(this.props.stopWatch[index].timerOn){
      alert('Please stop the current timer named ' + '\"' + this.props.businessData.title + '\"')
      return false;
    }
    document.getElementById('formCover2').style.display="block";
    document.getElementById('popUpContainer').style.display="flex";
    document.getElementById('settingsModal').style.opacity='.050';

	}

	hideRemovePopUp = () => {
		document.getElementById('popUpContainer').style.display="none";
    document.getElementById('settingsModal').style.opacity='1';
    document.getElementById('formCover2').style.display="none";

	}

  titleHandler = (e) => {
    this.setState({newData: {
      ...this.state.newData,
      title: e.target.value
      }
    })
  }

  goalHandler = (e) => {
    this.setState({
      newData: {
        ...this.state.newData,
        goal: e.target.value
      }})
  }

  showSavingPopUpMessage = () => {
    this.setState({isShowSavingPopUpMessage: true})
    document.getElementById('formCover2').style.display="block";

  }
  hideSavingPopUpMessage = () => {
    this.setState({isShowSavingPopUpMessage: false})
    document.getElementById('formCover2').style.display="none";

  }
  saveHandler = () => {
    this.props.updateBusinessData(this.state.newData, this.props.businessData.id);
    this.hideSavingPopUpMessage();
  }


	render(){

	let popUpMessage = (
			
      <div id="popUpContainer" className={classes.popUpContainer}>
				<p className={classes.popUpContainer_message}>Are you sure you want to <span className={classes.red}>delete</span> this activity?</p>
        <p className={classes.popUpContainer_message_description}>You will not be able to restore your business</p>
        <div className={classes.yesNoWrapper}>
        <span onClick={this.deleteHandler} className={classes.yesBtn}>YES</span>
				<span onClick={this.hideRemovePopUp} className={classes.noBtn}>NO</span>
        </div>
      </div>
  )		

  let savingPopUpMessage;
    if(this.state.isShowSavingPopUpMessage){
      savingPopUpMessage = (
          
          <div className={classes.savePopUpContainer}>
            <p className={classes.popUpContainer_message}>Are you sure you want to update this business?</p>
            <div className={classes.yesNoWrapper}>
            <span onClick={this.saveHandler} className={classes.yesBtn}>YES</span>
            <span onClick={this.hideSavingPopUpMessage} className={classes.noBtn}>NO</span>
            </div>
          </div>
      )
    }   

	return(
      <div>
        <div id="settingsModal" className={classes.settingsModal}>
        	<h2 className={classes.settingsTitle}>Settings</h2>
        	<div className={classes.settingsFields}>
        	<span>Title: </span>
          <input type="text" onChange={(e)=>this.titleHandler(e)} value={this.state.newData.title}/><br/>
        	<span>GOAL: </span>
          <input type="number" onChange={(e)=>this.goalHandler(e)} value={this.state.newData.goal}/><br/>
        	</div>
        	<button className={classes.deleteBtn} onClick={this.showRemovePopUp}>Delete this activity</button><br/>
          <button className={classes.saveBtn} onClick={this.showSavingPopUpMessage}>Save</button>
        </div>
        {savingPopUpMessage}
        {popUpMessage}
        </div>
		)
	}

}

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
      stopWatch: state.stopWatch.stopWatches
    }
  }

const mapDispatchToProps = dispatch => {
    return{
      updateBusinessData: (updatedData, id) => dispatch(businessBuilderActions.updateBusinessData(updatedData, id)),
      deleteBusiness: (id) => dispatch(businessBuilderActions.deleteBusiness(id)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);