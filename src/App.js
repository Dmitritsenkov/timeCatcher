import React, {Component} from 'react';
import './App.css';

import { connect } from 'react-redux';

//Components:
import Layout from './components/Layout/Layout';
import BusinessList from './components/BusinessList/BusinessList';
import MainPage from './components/MainPage/MainPage';


//Containers:
import MainDisplay from './containers/MainDisplay/MainDisplay';
import Stopwatch from './containers/Stopwatch/Stopwatch';

import authActions from './store/actions/auth';
import businessBuilder from './store/actions/businessBuilder';
import stopWatch from './store/actions/stopWatch';

class App extends Component {

	componentDidMount(){
		this.props.fetchBusinessDataBegin(localStorage.getItem('userId'))
		this.props.onTryAutoSign()
	}

	render(){

		let mainDisplay = null;
		let businessList = null;
		let mainPage = null;

		if(!this.props.businessLoading && !this.props.stopWatchesLoading && localStorage.getItem('userId')){
			mainDisplay = <MainDisplay/>
			businessList = <BusinessList/>
		}
		
		if(!localStorage.getItem('userId')){
			mainPage = <MainPage/>
		}


	  return ( 
				<Layout>
			    	{businessList}
			    	{mainDisplay}
			    	{mainPage}
			    <div className="footer">
    				<p className="footer_madeByText">Made by <a href="#">Dmitritsenkov</a></p>
    			</div>
			    </Layout>
	  );
	}
}

	const mapStateToProps = state => {
		return{
			stopWatchesLoading: state.stopWatch.loading,
			businessLoading: state.businessBuilder.loading,
			stopWatches: state.stopWatch.stopWatches,
      		business: state.businessBuilder.business,
		}
	}

	const mapDispatchToProps = dispatch => {
		return{
			fetchBusinessDataBegin: (id) => (businessBuilder.fetchBusinessDataBegin(id)),
			onTryAutoSign: () => dispatch(authActions.authCheckState()),
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(App);
