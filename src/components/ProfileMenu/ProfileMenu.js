import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './ProfileMenu.module.css';
import firebase from '../../config/fbConfig';

function ProfileMenu(props){

	const dispatch = useDispatch();

	const signOutHandler = () => {
		dispatch({type: 'AUTH_LOGOUT'})
		dispatch({type: 'CLEAR_STOPWATCH_STATE'})
		dispatch({type: 'CLEAR_BUSINESS_BUILDER_STATE'})
		props.profileMenuHandler();
		    window.location.reload(false);

	}



	return(
		<div className={classes.profileMenu}>
			<ul>
				<li onClick={signOutHandler}>Sign out</li>
			</ul>
		</div>
		)
}

export default ProfileMenu;