import React, {Component} from 'react';
import classes from './BusinessList.module.css';
import { connect } from 'react-redux';

//actions
import * as actions from '../../store/actions/businessBuilder';
import * as siteOptionsActions from '../../store/actions/siteOptions';



import * as fetchingDataActions from '../../store/actions/businessBuilder';


import BusinessForm from '../../containers/Forms/BusinessForm/BusinessForm';
import BusinessTab from '../BusinessTab/BusinessTab';

// icons:
import listIcon from '../../images/icons/listIcon.png';
import addBusinessIcon from '../../images/icons/addBusinessIcon.png';

class BusinessList extends Component {

  state={
    isBusinessFormShown: false,
    sideBarMenuIsShown: true,
  }

  componentDidMount(){
    this.setState({
      sideBarMenuIsShown: this.props.siteOptions.sideBarMenuIsShown
    })
  }

  showBusinessForm = () => {
    if(this.props.auth.userId){
      this.setState({isBusinessFormShown: true})      
    }
    else{
      alert('Please sign up or register a new account!')
    }
  }

  hideBusinessForm = () => {
    this.setState({isBusinessFormShown: false})
  }

  toggleSidebarMenuHandler = () => {
    this.props.toggleSidebarMenuHandler(!this.state.sideBarMenuIsShown)
    this.setState({sideBarMenuIsShown: !this.state.sideBarMenuIsShown});
  }

  render(){

    let businessTab;
    if(this.props.business.length==0){
      businessTab = null;
    }
    else{
      businessTab = this.props.business.map(
          (el)=><BusinessTab 
              deleteBusiness = {this.props.deleteBusiness}
              switchBusinessTab={this.props.switchBusinessTab} 
              business={el}/>
        )
    }

  let businessForm = null;

  if(this.state.isBusinessFormShown){
    businessForm = <BusinessForm hideBusinessForm = {this.hideBusinessForm} addBusiness={this.props.addBusiness}/>;
  }   


  return (
    <div>
      <button className={classes.toggleSidebarMenuSecond} onClick={this.toggleSidebarMenuHandler}>☰</button>
  	<div className={this.state.sideBarMenuIsShown ? classes.businessListWrapper : classes.businessListWrapperHidden}>
      <button className={classes.toggleSidebarMenu} onClick={this.toggleSidebarMenuHandler}>☰</button>
  		<h1 className={classes.TimeCatcherLogoText}>TimeCatcher</h1>
      <div>
        <p className={classes.myBussinesTitle}>MY ACTIVITIES</p>
        {businessTab}
      </div>  
        <div onClick={this.showBusinessForm} className={classes.addNewBusinessWrapper}>
          <div className={classes.plusBtn}>
            <div className={classes.plus}>+</div>
          </div>
               <span className={classes.btnText}>New activity</span>
        </div>
      {businessForm}
    </div>
    </div>
  );
}
}

  const mapStateToProps = state => {
    return {
      business: state.businessBuilder.business,
      auth: state.auth,
      siteOptions: state.siteOptions
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      addBusiness: (data) => dispatch(actions.addBusiness(data)),
      deleteBusiness: (id) => dispatch(actions.deleteBusiness(id)),
      switchBusinessTab: (id) => dispatch(actions.switchBusinessTab(id)),
      toggleSidebarMenuHandler: (sideBarMenuIsShown) => dispatch(siteOptionsActions.toggleSidebarMenuHandler(sideBarMenuIsShown))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
