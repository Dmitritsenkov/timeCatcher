import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';

const initialState = {
	stopWatches: [
		// {
		// 	stopWatchIsShown: true,
		//     currentStopwatchTime: {
		// 		hours: '00',
		// 		minutes: '00',
		// 		seconds: '00',
		// 		centiseconds: '00'
		// 	},
		// 	timerTime: 0,
		// 	timerStart: 0,
		// 	timerOn: false,
		// 	timerId: null,
		// 	businessId: 'testId_fgh' 
		// }
	],
	loading: false
}

const reducer = (state=initialState, action) => {

	switch(action.type){

		case actionTypes.INITIALIZE_STOPWATCHES_START:
			{
				let newState = {...state}
				newState.loading = true;
				return newState;
			}
			
case actionTypes.INITIALIZE_STOPWATCHES_SUCCESS:
			{
				if(action.businessesId.length==0){
					let newState = {
						stopWatches: [],
						loading: false
					}
					return newState;
				}

				let newStopWatches = [];
				for(let i = 0; i < action.businessesId.length; i++){
					let newStopWatch = {
						stopWatchIsShown: true,
					    currentStopwatchTime: {
							hours: '00',
							minutes: '00',
							seconds: '00',
							centiseconds: '00'
						},
						timerTime: 0,
						timerStart: 0,
						timerOn: false,
						timerId: null,
						businessId: action.businessesId[i] 
					}
					newStopWatches.push(newStopWatch)
				}
				newStopWatches[action.businessesId.length-1].stopWatchIsShown = true;
				let newState = {
					stopWatches: newStopWatches,
					loading: false
				}
				return newState;
			}

		case actionTypes.ADD_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];

				let newStopWatch = {
					stopWatchIsShown: true,
					   currentStopwatchTime: {
						hours: '00',
						minutes: '00',
						seconds: '00',
						centiseconds: '00'
					},
					timerTime: 0,
					timerStart: 0,
					timerOn: false,
					timerId: null,
					businessId: action.id 
					}

				newStopWatches.push(newStopWatch)

				let newState = {
					stopWatches: newStopWatches,
					loading: false
				}

				return newState;
			}

		case actionTypes.DELETE_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];
				console.log(action.id)
				let index = newStopWatches.findIndex(el=>el.businessId==action.id);
				console.log(index)
				newStopWatches.splice(index, 1)

				let newState = {
					stopWatches: newStopWatches,
					loading: false
				}
				return newState;
			}

		case actionTypes.SAVE_CURRENT_STOPWATCH_TIME:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

				newStopWatches[0].currentStopwatchTime = {...action.time};
				newStopWatches[0].timerTime = action.timerTime;

				let newState = {
	  				stopWatches: newStopWatches
	  			}

				return newState;
			}

		case actionTypes.SAVE_TIMER_ID:
			{

				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

	      		newStopWatches[index].timerId = action.timerId;

				let newState = {
					stopWatches: newStopWatches
				}

				return newState;
			}	

		case actionTypes.UPDATE_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];
				if(newStopWatches.length==0){
					return state;
				}
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);

				let stopWatchData = action.stopWatchData;

	  			if(stopWatchData.timerOn!==undefined){
	      			newStopWatches[index].timerOn = stopWatchData.timerOn;
	      		}
	      		if(stopWatchData.timerStart!==undefined){
	      			newStopWatches[index].timerStart = stopWatchData.timerStart;
	      		}
	      		if(stopWatchData.timerTime!==undefined){
	      			newStopWatches[index].timerTime = stopWatchData.timerTime;
	      		}

	  			let centiseconds = ("0" + (Math.floor(newStopWatches[index].timerTime / 10)% 100)).slice(-2);
	  			let seconds = ("0" + (Math.floor(newStopWatches[index].timerTime / 1000) % 60)).slice(-2);
	  			let minutes = ("0" + (Math.floor(newStopWatches[index].timerTime / 60000) % 60)).slice(-2);
	  			let hours = ("0" + Math.floor(newStopWatches[index].timerTime / 3600000)).slice(-2);
				
	  			newStopWatches[index].currentStopwatchTime.centiseconds = centiseconds;
	  			newStopWatches[index].currentStopwatchTime.seconds = seconds;
	  			newStopWatches[index].currentStopwatchTime.minutes = minutes;
	  			newStopWatches[index].currentStopwatchTime.hours = hours;

	  			let newState = {
	  				stopWatches: newStopWatches
	  			}

				return newState;
					
			}

		case actionTypes.CLEAR_CURRENT_STOPWATCH_TIME:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.id);
				if(index==-1){
					return state;
				}

				newStopWatches[index].currentStopwatchTime = {
					hours: '00',
					minutes: '00',
					seconds: '00',
					centiseconds: '00'
				}
				newStopWatches[index].timerTime = 0;

				let newState = {
	  				stopWatches: newStopWatches
	  			}
	  			
				return newState;
			}

		case actionTypes.CLEAR_STOPWATCH:
			{
				let newStopWatches = [...state.stopWatches];
				let index = newStopWatches.findIndex((el)=>el.businessId==action.stopWatchData.businessId);
console.log(newStopWatches);
				console.log(index);
	      		newStopWatches[index].timerStart  = 0;
	      		newStopWatches[index].timerTime = 0;

	      		newStopWatches[index].currentStopwatchTime.centiseconds = '00';
	      		newStopWatches[index].currentStopwatchTime.seconds = '00';
	      		newStopWatches[index].currentStopwatchTime.minutes = '00';
	      		newStopWatches[index].currentStopwatchTime.hours = '00';

				let newState = {
	  				stopWatches: newStopWatches,
	  				loading: false
	  			}
	  			
				return newState;
			}

			case actionTypes.CLEAR_STOPWATCH_STATE: 
				return updatedObject(state, {
					stopWatches: [],
					loading: false,
				})		

		default:
			return state; 
	}

}

export default reducer;