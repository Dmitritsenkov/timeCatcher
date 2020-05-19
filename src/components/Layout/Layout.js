import React, {useState, useContext} from 'react';
import {useSelector} from 'react-redux'
import classes from './Layout.module.css';

import Auth from '../../containers/Auth/Auth';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

function Layout(props) {

	const authSelector = useSelector(state=>state.auth)

	const [ isModalShown, setIsModalShown ] = useState({
		isSignUpModalShown: false,
		isSignInModalShown: false
	})

	const [profileMenu, setProfileMenu] = useState({
		isProfileMenuShown: false
	})


	const showSignUpModal = () => {
		setIsModalShown({
			isSignUpModalShown: true,
			isSignInModalShown: false
		})
	}

	const showSignInModal = () => {
		setIsModalShown({
			isSignUpModalShown: false,
			isSignInModalShown: true
		})
	}

	const hideModal = () => {
		setIsModalShown({
			isSignUpModalShown: false,
			isSignInModalShown: false
		})
	}

	const profileMenuHandler = () =>{
		setProfileMenu({
			isProfileMenuShown: !profileMenu.isProfileMenuShown
		})
	}



	let topMenu = null;
	let modal = null;
	let profileMenuComp = null;


	if(isModalShown.isSignUpModalShown){
		modal = <Auth signUp={true} showSignInModal={showSignInModal} hideModal={hideModal}/> // SignUp modal
	}

	if(isModalShown.isSignInModalShown){
		modal = <Auth signIn={true} showSignUpModal={showSignUpModal} hideModal={hideModal}/> // SignIn modal
	}

	if(localStorage.userId){
		topMenu = <ul className={classes.topMenu}>
	    			<li className={classes.accountProfile} onClick={profileMenuHandler}>
		    			<u className={`fa ${"fa-user"}`}></u>
	    				<a href="#">{localStorage.email}</a>
	    				<i href="#" className={`fa ${"fa-sort-down"}`}></i>
	    			</li>
	    		  </ul> 
	}

	if(!localStorage.userId){
		topMenu = <ul className={classes.topMenu}>
	   				<li className={classes.signUp} onClick={showSignUpModal}><a href="#">Sign Up</a></li>
	   				<li className={classes.signIn} onClick={showSignInModal}><a href="#">Sign In</a></li>
	    		</ul>
	}

	if(profileMenu.isProfileMenuShown){
		profileMenuComp = <ProfileMenu profileMenuHandler={profileMenuHandler} />
	}
	
  return (
  	<div>
	    <div className={classes.layoutWrapper}>
	    	{topMenu}
	    	{profileMenuComp}
	    </div>
	    {modal}
    	{props.children}
    	<div id="formCover2"></div>
    </div>	
  );
}

export default Layout;
