import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Header from "../components/Header";

class SuperAdminDashboards extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      isLoggedIn: props.location.loggedIn,
	      current_user: props.location.user
	    }
	 }

	render() {
		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.current_user}/>
				
				<div className="primary-color d-flex align-items-left justify-content-left">
					<div className="jumbotron jumbotron-fluid bg-transparent">
					  <div className="container secondary-color">
					    <h3>Super Admin Dashboard</h3>
					    <p className="lead">
					      Manage and list users, admin, properties
					    </p>
					    <Link
					      to={{ pathname: "/users",
				        	  loggedIn: this.state.isLoggedIn,
				        	  user: this.state.current_user
				    		}}
					      className="btn btn-md custom-button"
					      role="button"
					    >
					    	Manage Users
					    </Link>
					    &nbsp;&nbsp;&nbsp;
					    <Link
					      to={{ pathname: "/admins",
				        	  loggedIn: this.state.isLoggedIn,
				        	  user: this.state.current_user
				    		}}
					      className="btn btn-md custom-button"
					      role="button"
					    >
					    	Manange Admins
					    </Link>
					    &nbsp;&nbsp;&nbsp;
					    <Link
					      to={{ pathname: "/properties",
				        	  loggedIn: this.state.isLoggedIn,
				        	  user: this.state.current_user
				    		}}
					      className="btn btn-md custom-button"
					      role="button"
					    >
					    	Manage Properties
					    </Link>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}

export default SuperAdminDashboards
