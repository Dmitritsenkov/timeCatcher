import * as actionTypes from '../actions/actionsTypes';
import firebase from '../../config/fbConfig';
import {updatedObject} from '../utility';


const initialState = {
	business: [
		// {	
		// 	id: 0,
		// 	title: 'Test business',
		// 	totalHours: {
  //     		  hours: 0,
  //     		  minutes: 0
  //     		},
		// 	goalHours: 10000,
  //     		daylyGoal: {
  //     		  hours: 2,
  //     		  minutes: 0
  //     		},			
  //     		weeklyGoal: {
  //     		  hours: 14,
  //     		  minutes: 0
  //     		},
  //     		monthlyGoal:{
  //     			hours: 56,
  //     			minutes: 0
  //     		},
		// 	description: 'It\'s a test bussiness.',
		// 	progress: 0, // percent
		// 	isShown: true,
		// }	



		// 	COUNTDOWN
		// 	countDownIsShown: false,
		// 	currentCountdownTime: {
  //       		hours: '00',
  //       		minutes: '00',
  //       		seconds: '00',
  //    		},
  //     		timerTimeCountDown: 0,

  //     		currentMiniStopwatchTime: {
		// 		hours: '00',
		// 		minutes: '00',
		// 		seconds: '00'
		// 	},
		// 	miniTimerTime: 0
		// },
	],
	loading: false,
	error: null,
}

const reducer = (state=initialState, action) => {

	switch(action.type){

		case actionTypes.ADD_BUSINESS:
			{
				let newBusiness = [...state.business]

				for(let i = 0; i < newBusiness.length; i++){
					newBusiness[i].isShown = false;
				}	

				let newBusinessData = {
					id: action.data.id,
					title: action.data.title,
					totalHours: {
	      			  hours: action.data.totalHours.hours,
	      			  minutes: action.data.totalHours.minutes
	      			},
	      			goalHours: action.data.goalHours,
	      			description: action.data.description,
					progress: action.data.progress, 
	      				stopWatchIsShown: true,
	      				isShown: true
	      			}

				newBusiness.push(newBusinessData);

				let newState = {
					business: newBusiness,
					loading: false,
					error: null	
				}

				return newState;
			}	

		case actionTypes.UPDATE_DATA:
			{
				let newBusiness = [...state.business];
				let index = newBusiness.findIndex(el=>el.id==action.id);
				console.log(action.data.title)
				newBusiness[index].title = action.data.title;
				newBusiness[index].goalHours = action.data.goal

				let newState = {
					business: newBusiness,
					loading: false,
					error: null
				}
				return newState;	
			}	

		case actionTypes.DELETE_BUSINESS:
			{
				let newBusiness = [...state.business];
				let index = newBusiness.findIndex(el=>el.id==action.id);
				newBusiness.splice(index, 1)
				

				let newState = {
					business: newBusiness,
					loading: false,
					error: null
				}
				return newState;	
			}
		case actionTypes.SWITCH_BUSINESS_TAB:
			{
				let newState = Object.assign({}, state);
				let index = newState.business.findIndex((el)=>el.id==action.id);

				let newBusiness = [...newState.business];
					newBusiness.forEach((item)=>{
						item.isShown = false;
					})

					newBusiness[index].isShown = true;
					newState.business = newBusiness;
				return newState;
			}

		case actionTypes.ADD_WORKING_HOURS:
			{
			let newBusiness = [...state.business];
			let index = newBusiness.findIndex((el)=>el.id==action.stopWatchData.businessId);

			newBusiness[index].totalHours.hours = action.totalHours.hours;
			newBusiness[index].totalHours.minutes = action.totalHours.minutes;

				let newState = {
					business: newBusiness,
					loading: false,
					error: null
				} 

				return newState;
			}

			case actionTypes.UPDATE_PROGRESS:
				{
				let newBusiness = [...state.business];
				let index = newBusiness.findIndex((el)=>el.id==action.id);
				
				newBusiness[index].progress = action.progress;

					let newState = {
						business: newBusiness,
						loading: false,
						error: null
					}
					return newState;
				}	

		case actionTypes.FETCH_BUSINESSDATA_SUCCESS:
			{
				let newBusiness = [];
				let idOfBusinesses = Object.keys(action.userBusinesses.businesses);
				if(idOfBusinesses.length==0){
					let newState = {
						business: [],
						loading: false,
						error: null
					}
					return newState;
				}
				else{
					let newBusinessDataObj;
					for(let i = 0; i<idOfBusinesses.length; i++){
						let currentBusiness = action.userBusinesses.businesses[idOfBusinesses[i]];
					newBusinessDataObj = {
						id: idOfBusinesses[i],
						title: currentBusiness.title,
						totalHours: {
	      				  hours: currentBusiness.totalHours.hours,
	      				  minutes: currentBusiness.totalHours.minutes
	      				},
						goalHours: currentBusiness.goalHours,
						description: currentBusiness.description,
						progress: currentBusiness.progress,
						isShown: false,
					}
						newBusiness.push(newBusinessDataObj)
					}
					newBusiness[0].isShown = true;
					let newState = {
						business: newBusiness,
						loading: false,
						error: null
					}
					return newState;	
				}
			}
			case actionTypes.CLEAR_BUSINESS_BUILDER_STATE: 
				return updatedObject(state, {
					business: [],
					loading: false,
					error: null
				})		

			default:
				return state; 
	}
}

export default reducer;