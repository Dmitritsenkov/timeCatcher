import React, {useState} from 'react';
import classes from './MainPage.module.css';
import {useSelector} from 'react-redux'
import Auth from '../../containers/Auth/Auth';


const MainPage = () => {

	const authSelector = useSelector(state=>state.auth)

	const [ isModalShown, setIsModalShown ] = useState({
		isSignUpModalShown: false,
		isSignInModalShown: false
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

	let modal = null;

	if(isModalShown.isSignUpModalShown){
		modal = <Auth signUp={true} showSignInModal={showSignInModal} hideModal={hideModal}/> // SignUp modal
	}

	if(isModalShown.isSignInModalShown){
		modal = <Auth signIn={true} showSignUpModal={showSignUpModal} hideModal={hideModal}/> // SignIn modal
	}


	return(
		<div className={classes.mainPageWrapper}>
			<div className={classes.mainPageLeft}>
				<h2 className={classes.mainText}>With this app you can track your time of any activity, just sign up and start right now</h2>
				<button onClick={showSignUpModal} className={classes.signUpBtn}>SIGN UP</button>
			</div>
			{modal}
		</div>
		)
}

export default MainPage;