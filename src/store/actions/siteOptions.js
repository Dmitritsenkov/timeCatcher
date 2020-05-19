import * as actionTypes from './actionsTypes';


export const toggleSidebarMenuHandler = (isShown) => {
	return ({
		type: actionTypes.TOGGLE_SIDEBAR_MENU,
		isShown: isShown
	})
}
