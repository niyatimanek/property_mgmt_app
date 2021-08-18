import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Header from "../components/Header";

class AdminDashboard extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	adminProperties: [],
			current_user: {},
			isLoggedIn: false
	    }
	}

	componentDidMount(){
		const url = '/api/v1/properties/get_admin_properties';
		fetch(url)
			.then(async response => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
   		    	const data = isJson && await response.json();
				if (response.ok) {
					this.setState({ adminProperties: data.properties, current_user: data.user, isLoggedIn: data.loggedIn } )
				}
			})
			.catch(() => this.props.history.push("/superAdminDashboard"))
	}

	render() {
		const columns = [
						  {
						    name: 'Property Name',
						    selector: row => `${ row.name }`,
						    sortable: true,
						  },
						  {
						    name: 'Location',
						    selector: row => `${ row.address }, ${ row.city } - ${ row.zipcode }, ${row.state} ${row.country}`,
						    sortable: true,
						    wrap: true
						  },
						  {
						    name: 'Approval Status',
						    selector: row => `${ row.is_approved ? 'Approved' : 'Rejected' }`,
						    sortable: true,
						  },
						  {
						    name: 'Action',
						    selector: row => <div><Link to={{ pathname:'/admin_property/'+`${ row.id }`}} className="btn btn-md btn-success">Update Status</Link></div>,
						    sortable: true,
						  },
						];
	    const { adminProperties } = this.state;
	  	const allProperties = <DataTable
					        columns={columns}
					        data={adminProperties}
					      />

	    const noProperty = (
	      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
	        <h4>
	          No properties yet.
	        </h4>
	      </div>
	    );

		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.current_user}/>
				
				<div className="primary-color d-flex align-items-center justify-content-center">
					<div className="jumbotron jumbotron-fluid bg-transparent">
					  <div className="container secondary-color">
					    <h3>Admin Dashboard</h3>
					    <p className="lead">
					      Manage and list properties
					    </p>
					    <div className="row">
							{ adminProperties.length > 0 ? allProperties : noProperty }
						</div>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminDashboard
