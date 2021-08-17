import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';

class SuperAdminDashboards extends React.Component {
	render() {
		
		return(
			<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
				<div className="jumbotron jumbotron-fluid bg-transparent">
				  <div className="container secondary-color">
				  	
				    <h1 className="display-4">Super Admin Dashboard</h1>
				    <p className="lead">
				      Manage and list users, admin, properties
				    </p>
				    <hr className="my-4" />
				    <Link
				      to="/users"
				      className="btn btn-lg custom-button"
				      role="button"
				    >
				    	Manage Users
				    </Link>
				    &nbsp;&nbsp;&nbsp;
				    <Link
				      to="/admins"
				      className="btn btn-lg custom-button"
				      role="button"
				    >
				    	Manange Admins
				    </Link>
				    &nbsp;&nbsp;&nbsp;
				    <Link
				      to="/properties"
				      className="btn btn-lg custom-button"
				      role="button"
				    >
				    	Manage Properties
				    </Link>
				  </div>
				</div>
			</div>
		)
	}
}

export default SuperAdminDashboards
