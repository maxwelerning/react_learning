import React from 'react';
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, putUserProfile, putUserStatus} from "../../redux/profile-reducer";
import Profile from "./Profile";
import { withRouter } from "react-router-dom"
import {compose} from "redux";




class ProfileContainer extends React.Component {

   checkUserId = () => {
      let userId = this.props.match.params.userId;

      if(!userId) {
         userId = this.props.id;
         if(!userId) {
            this.props.history.push('/login')
         }
      }

      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId)

   }

   componentDidMount() {
      this.checkUserId()
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.match.params.userId !== prevProps.match.params.userId) {
         this.checkUserId()
      }
   }

   render() {
      return (
         <Profile {...this.props} isOwner={!this.props.match.params.userId} putUserProfile={this.props.putUserProfile} userStatus={this.props.userStatus} usersProfile={this.props.usersProfile}/>
      );
   }
}

let mapStateToProps = (state) => {
   return {
      usersProfile: state.profilePage.usersProfile,
      userStatus: state.profilePage.userStatus,
      id: state.auth.id,
   }
}


export default compose(
   connect(mapStateToProps, {getUserProfile, getUserStatus, putUserStatus, putUserProfile}),
   withRouter,
)(ProfileContainer)