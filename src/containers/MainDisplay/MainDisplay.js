import React, { Component } from 'react';

import classes from './MainDisplay.module.css'
import BusinessBuilder from '../BusinessBuilder/BusinessBuilder';

import { connect } from 'react-redux';


class MainDisplay extends Component {


	render(){

		let businessBuilder = this.props.business.map((el)=>{
			if(el.isShown){
				return <BusinessBuilder currentBussinessId={el.id}/>
			}
		});

		return(
			<div className={classes.mainDisplay}>
				{businessBuilder}
			</div>
			)
	}

}

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
    }
  }

export default connect(mapStateToProps)(MainDisplay);