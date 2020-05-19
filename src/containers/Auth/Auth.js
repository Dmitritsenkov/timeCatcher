import React, {Component} from 'react';
import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as authActions from '../../store/actions/auth';

class Auth extends Component {

	state = {
	    email: '',
	    password: '',
	    confirmPassword: '',
	    errMsg: null
  	}

  	static getDerivedStateFromProps(props, state){
  		if(props.error!==null){
  			return{errMsg: props.error.message}
  		}
  		return null;
  	}

	emailHandler = (e) => {
    	this.setState({email: e.target.value})
  	}

    passwordHandler = (e) => {
    	this.setState({password: e.target.value})
  	}

  	confirmPasswordHandler = (e) => {
  		this.setState({confirmPassword: e.target.value})
  	}

  	checkValidity = () => {
  		if(this.state.password==this.state.confirmPassword){
  			return true;
  		}
  		else{
  			return false;
  		}
  	}

  	showSignInModal = () => {
  		this.props.clearError()
  		this.setState({email: '', password: '', confirmPassword: '', errMsg: null}, 
  			function(){
  			this.props.showSignInModal()
  		})
  	}

  	showSignUpModal = () => {
  		this.props.clearError()
  		this.setState({email: '', password: '', confirmPassword: '', errMsg: null},
  			()=>{
  			this.props.showSignUpModal()
  		})
  	}

	submitHandler = () => {

		if(this.props.signUp){
			if(!this.checkValidity()){
				this.setState({errMsg: "Passwords do not match"})
				return false
			}
		}

		this.props.onAuth(this.state.email, this.state.password, this.props.signIn, this.props.hideModal)		
	}

	render(){
  		let err = null;
  		if(this.state.errMsg!==null){
  			err = <p className={classes.errorMsg}>{this.state.errMsg}</p>
  		}
  		if(this.state.errMsg==null){
  			err = null;
  		}

		let signInForm = 
			<form>
				<label>E-MAIL</label><br/>
		        <input onChange={(e)=>this.emailHandler(e)} type="text" value={this.state.email}/><br/>
		        <label>PASSWORD</label><br/>
		        <input onChange={(e)=>this.passwordHandler(e)} type="password" value={this.state.password}/><br/>
			</form>
		

		let signUpForm = 
			<form>
				<label>E-MAIL</label><br/>
	            <input onChange={(e)=>this.emailHandler(e)} type="text" value={this.state.email}/><br/>
	            <label>PASSWORD</label><br/>
	            <input onChange={(e)=>this.passwordHandler(e, 'first')} type="password" value={this.state.password}/><br/>
	            <label>REPEAT PASSWORD</label><br/>
	            <input onChange={(e)=>this.confirmPasswordHandler(e, 'second')} type="password" value={this.state.confirmPassword}/><br/>
            </form>
		

		return(
	      <div>
	        <div className={classes.formWrapper}>
	          <div className={classes.firstHalf}>
	            <h2 className={classes.formTitle}>{this.props.signIn ? "Sign In" : "Sign Up"}</h2>
	            <p className={classes.description}>With your account you can save your work time.</p>
	            <p className={classes.description}>Get yourself one.</p>
	          </div>
	          <div className={classes.secondHalf}>
				<h2 className={classes.mobileFormTitle}>{this.props.signIn ? "Sign In" : "Sign Up"}</h2>
	            {this.props.signIn ? signInForm : signUpForm}
	            {err}
				<button onClick={this.submitHandler} className={classes.btnSubmit} type="submit">
				{this.props.signIn ? "Log In" : "Sign Up"}
				</button> or &nbsp;
	            <a href="#" onClick={ !this.props.signIn ? this.showSignInModal : this.showSignUpModal} className={classes.link}>
	            { !this.props.signIn ? "Sign In" : "Sign Up"}
	            </a>
	          </div>
	        </div>
	        <div 
	          id='formCover'
	          className={classes.formCover}
	          onClick={this.props.hideModal}>
	        </div>
	      </div>
			)
	}
}

const mapStateToProps = state => {
	return{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token!==null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp, hideModal) => dispatch(authActions.auth(email, password, isSignUp,hideModal)),
		clearError: () => dispatch(authActions.clearError())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)