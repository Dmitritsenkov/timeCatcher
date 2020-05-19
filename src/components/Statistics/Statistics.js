import React from 'react';
import classes from './Statistics.module.css';
import ProgressBar from '../UI/ProgressBar/ProgressBar';

	const Statistics = (props) =>{

		let hours = props.totalHours.hours;
		let minutes = props.totalHours.minutes;

		return(
			<div className={!props.sideBarMenuIsShown ? classes.statisticsWrapperSidebarHidden : classes.statisticsWrapper}>
				<span>Total hours: {hours}h{minutes}m</span><br/><br/>
				<p className={classes.progress}>Progress</p>
				<ProgressBar progress={props.progress}/>
			</div>
			)	
	}

	export default Statistics;
