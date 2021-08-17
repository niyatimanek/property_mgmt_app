import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DataTable from 'react-data-table-component';

class MyProperties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userProperties: [],
			user: {},
			isLoggedIn: false
		}
	}

	componentDidMount(){
		const url = '/api/v1/users/get_properties';
		fetch(url)
			.then(async response => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
   		    	const data = isJson && await response.json();
				if (response.ok) {
					this.setState({ userProperties: data.properties, user: data.user, isLoggedIn: data.loggedIn } )
				}
			})
			.catch(() => this.props.history.push("/"))
	}

	render(){
		const userParams = this.state.user;
		const superAdminDashboardBtn = <Link
			        to="/superAdminDashboard"
		            className="btn btn-md custom-button"
		         	role="button"
			    >
		        	Go to Super Admin Dashboard
		       	</Link>
		const adminDashboardBtn = <Link
			        to="/adminDashboard"
		            className="btn btn-md custom-button"
		         	role="button"
			    >
		        	Go to Admin Dashboard
		       	</Link>
		const userDashboardBtn = <Link
			        to="/dashboard"
		            className="btn btn-md custom-button"
		         	role="button"
			    >
		        	Go to Dashboard
		       	</Link>

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
						  }
						];

	    const { userProperties } = this.state;
	  	const  allUserProperties = <DataTable
					        title="List of Properties Bought"
					        columns={columns}
					        data={userProperties}
					      />

	    const noUserProperty = (
	      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
	        <h4>
	          No properties yet.
	        </h4>
	      </div>
	    );

	    const isLoggedIn = this.state.isLoggedIn;
	    const {user} = this.state;
		return(
			<div className="container">
				<Header loggedIn={isLoggedIn} user={user}/>
				<h3>{`Welcome, ${user.first_name} ${user.last_name}`}</h3>

				<div className="padding-xs">
					{userDashboardBtn}
					&nbsp;&nbsp;&nbsp;&nbsp;
					{ user.role == "super_admin" ? superAdminDashboardBtn : ''}
					&nbsp;&nbsp;&nbsp;&nbsp;
					{ ( user.role == "super_admin" || userParams.role == "admin" ) ? adminDashboardBtn : ''}
				</div>
				<div className="py-5">
					<main className="container">
						<div className="row">
						  { userProperties.length > 0 ? allUserProperties : noUserProperty }
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default MyProperties;