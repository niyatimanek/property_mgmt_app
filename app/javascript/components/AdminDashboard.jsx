import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';

class AdminDashboard extends React.Component {
	render() {
		return(
			<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
				<div className="jumbotron jumbotron-fluid bg-transparent">
				  <div className="container secondary-color">
				    <h1 className="display-4">Admin Dashboard</h1>
				    <p className="lead">
				      Manage and list properties
				    </p>
				    <hr className="my-4" />
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

export default AdminDashboard
