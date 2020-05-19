// case actionTypes.CLEAR_CURRENT_COUNTDOWN_TIME:
// 			let oldBusiness6 = state.business;
// 			let index6 = oldBusiness6.findIndex((el)=>el.id==action.id);
// 			let newBusiness6 = [...oldBusiness6];
// 			newBusiness6[index6].currentCountdownTime = {
// 				hours: '00',
// 				minutes: '00',
// 				seconds: '00'
// 			}
// 			newBusiness6[index6].timerTimeCountDown = 0;
// 			let newState6 = {
// 				business: newBusiness6
// 			}
// 			return newState6;

// 		case actionTypes.STOPWATCH_OR_COUNTDOWN_IS_SHOWN_HANDLER:

// 		let newBusiness7 = [...state.business];
// 		let index7 = newBusiness7.findIndex((el)=>el.id==action.id);
// 		if(action.countDownOrStopwatch=='stopWatch'){
// 			newBusiness7[index7].stopWatchIsShown = true;
// 			newBusiness7[index7].countDownIsShown = false;
// 		}
// 		else if(action.countDownOrStopwatch=='countDown'){
// 			newBusiness7[index7].stopWatchIsShown = false;
// 			newBusiness7[index7].countDownIsShown = true;
// 		}
// 		let newState7 = {
// 			business: newBusiness7
// 		}
// 		return newState7;

// 				case actionTypes.INCREASE_TIMER:

//       		let oldBusiness10 = state.business;
//       		let index10 = oldBusiness10.findIndex((el)=>el.id==action.id);
//       		let newBusiness10 = [...state.business];
//         	newBusiness10[index10].timerTimeCountDown = newBusiness10[index10].timerTimeCountDown + action.increaseBy;
// 			let newState10 = {
// 				business: newBusiness10
// 			}
// 			return newState10;


// 		case actionTypes.SAVE_TIMER_TIME:
// 			{
// 				let newStopWatches = [...state.stopWatches];
// 				let index = newStopWatches.findIndex((el)=>el.timerId==action.id);

// 				newStopWatches[index].currentCountdownTime = action.currentCountdownTime;
// 	    		newStopWatches[index].timerTimeCountDown = action.timerTimeCountDown;

// 	    		newStopWatches[index].currentMiniStopwatchTime = action.currentMiniStopwatchTime;
// 	    		newStopWatches[index].miniTimerTime = action.miniTimerTime;

// 				let newState = {
// 	  				stopWatches: newStopWatches
// 	  			}
	  			
// 				return newState;
// 			}

