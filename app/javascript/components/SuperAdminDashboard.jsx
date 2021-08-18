import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Header from "../components/Header";

class SuperAdminDashboards extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      isLoggedIn: props.loggedIn,
	      user: props.user
	    }
	 }

	render() {
		const userDashboardBtn = <Link
					to={{ pathname: "/dashboard",
			        	  loggedIn: this.state.isLoggedIn,
			        	  user: this.state.user
			    		}}
		            className="btn btn-sm custom-button"
		         	role="button"
			    >
		        	Go to Dashboard
		       	</Link>
		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.user}/>
				<div className="d-flex flex-row-reverse">
					{userDashboardBtn}
				</div>
				<div className="primary-color d-flex align-items-left justify-content-left">
					<div className="jumbotron jumbotron-fluid bg-transparent">
					  <div className="container secondary-color">
					    <h3>Super Admin Dashboard</h3>
					    <p className="lead">
					      Manage and list users, admin, properties
					    </p>
					    <Link
					      to="/users"
					      className="btn btn-md custom-button"
					      role="button"
					    >
					    	Manage Users
					    </Link>
					    &nbsp;&nbsp;&nbsp;
					    <Link
					      to="/admins"
					      className="btn btn-md custom-button"
					      role="button"
					    >
					    	Manange Admins
					    </Link>
					    &nbsp;&nbsp;&nbsp;
					    <Link
					      to="/properties"
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
