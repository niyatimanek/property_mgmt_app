import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';

class Properties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			properties: []
		}
	}

	componentDidMount(){
		const url = "/api/v1/properties/index";

		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok")
			})
			.then(response => this.setState({ properties: response} ))
			.catch(() => this.props.history.push("/"))
	}

	deactivateProperty = (id) => {
		const url = '/api/v1/properties/deactivate/'+id;
		const token = document.querySelector('meta[name="csrf-token"]').content;

		fetch(url, {
			method: "PUT",
			headers: {
				"X-CSRF-Token": token,
				"Content-Type": "application/json"
			}
		})
		.then(response => {
	        if (response.ok) {
	          return response.json();
	        }
	        throw new Error("Network response was not ok.");
	    })
	    .then(window.location.reload(false))
	    .catch(error => console.log(error.message));
	}

	render(){
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
						    name: 'Owner',
						    selector: row => `${ row.user.first_name } ${ row.user.last_name }`,
						    sortable: true,
						  },
						  {
						    name: 'Approval Status',
						    selector: row => `${ row.is_approved ? 'Approved' : 'Rejected' }`,
						    sortable: true,
						  },
						  {
						    name: 'Action',
						    selector: row => <div><Link to={{ pathname:'/property/'+`${ row.id }`}} className="btn btn-success">Update</Link> <button className="btn btn-danger" onClick={ () => this.deactivateProperty(`${ row.id }`) }>De-Activate</button></div>,
						    sortable: true,
						  },
						];
	    const { properties } = this.state;
	  	const allProperties = <DataTable
					        title="All Users"
					        columns={columns}
					        data={properties}
					      />

	    const noProperty = (
	      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
	        <h4>
	          No properties yet. Why not <Link to="/newProperty">create one</Link>
	        </h4>
	      </div>
	    );

	    return (
			<>
				<section className="jumbotron jumbotron-fluid text-center">
					<div className="container py-5">
						<h1 className="display-4">Properties</h1>
						<p className="lead text-muted">
						  All the Properties are listed below
						</p>
					</div>
				</section>
				<div className="py-5">
					<main className="container">
						<div className="text-right mb-3">
							<Link to={"/newProperty"} className="btn custom-button">
								Create New Property
							</Link>
							&nbsp;&nbsp;&nbsp;
							<Link to="/superAdminDashboard" className="btn custom-button">
							 	Go to Super Admin Dashboard
							</Link>
						</div>
						<div className="row">
						  { properties.length > 0 ? allProperties : noProperty }
						</div>
					</main>
				</div>
			</>
	    );
	}
}

export default Properties;