import React, {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux'
import classes from './BusinessTab.module.css';

const BusinessTab = (props) => {

	const findStopWatch = (stopWatches) => {
		let index = stopWatches.findIndex((el)=>el.businessId==props.business.id);
		return stopWatches[index];
	}
	const stopWatches = useSelector(state=>state.stopWatch.stopWatches)
	const stopWatch = findStopWatch(stopWatches)


	const switchBusinessTab = (e) => {
		if(e.target.nodeName=='BUTTON'){
			return false;
		}						
		let currentId = props.business.id;
		props.switchBusinessTab(currentId);
	}

	const editBusinss = ()=>{
		alert('nothing')
	}

	let selectedTabLine = null;
	if(props.business.isShown){
		selectedTabLine = <span className={classes.selectedTab}></span> 
	}

	let currentStopwatchTime = stopWatch.currentStopwatchTime;
	let hours = currentStopwatchTime.hours;
	let minutes = currentStopwatchTime.minutes;
	let seconds = currentStopwatchTime.seconds;

	let timerOn = stopWatch.timerOn;
	let timerTime = stopWatch.timerTime;

	const tabTimeRef = useRef();

	const green = classes.green;
	const orange = classes.orange;
	const grey = classes.grey;


	useEffect(()=>{
		if(timerOn){
			tabTimeRef.current.classList.remove(orange);
			tabTimeRef.current.classList.remove(grey);
			tabTimeRef.current.classList.add(green);
		}
		else if(!timerOn && timerTime=='0'){
			tabTimeRef.current.classList.remove(green);
			tabTimeRef.current.classList.remove(orange);
			tabTimeRef.current.classList.add(grey);
		}
		else if (!timerOn && timerTime>0){
			tabTimeRef.current.classList.remove(green);
			tabTimeRef.current.classList.add(orange);
			tabTimeRef.current.classList.remove(grey);		}
	},[timerOn, timerTime])


	return(
		<div onClick={(e)=>switchBusinessTab(e)} className={classes.businessTab}>
			{selectedTabLine}
			<span ref={tabTimeRef} className={classes.tabTime}>{hours}:{minutes}:{seconds}</span>
			<span className={classes.businessTitle}>{props.business.title}</span>
			 <br/>
			<span className={classes.progress}>{props.business.totalHours.hours}/{props.business.goalHours} hours</span><br/>
			{/* <button onClick={editBusinss} className={classes.btnEdit}>Edit</button><br/>
			<button onClick={showRemovePopUp} className={classes.btnDelete}>DELETE</button> */}
		</div>
		)
}

export default BusinessTab;