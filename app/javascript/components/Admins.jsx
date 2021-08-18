import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import Header from "../components/Header";

class Admins extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			admins: [],
			role: "admin",
			isLoggedIn: props.loggedIn,
	      	current_user: props.user		
		};
	}

	componentDidMount(){
		const url = `/api/v1/users/index?role=${this.state.role}`;
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok")
			})
			.then(response => this.setState({ admins: response} ))
			.catch(() => this.props.history.push("/"))
	}

	deactivateUser = (id) => {
		console.log(id);
		const url = '/api/v1/users/deactivate/'+id;
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

	editUser = (id) => {
		console.log(id);
	}

	render() {
		const columns = [
						  {
						    name: 'Name',
						    selector: row => `${ row.first_name } ${ row.last_name }`,
						    sortable: true,
						  },
						  {
						    name: 'Username',
						    selector: row => `${ row.username }`,
						    sortable: true,
						  },
						  {
						    name: 'Role',
						    selector: row => `${ row.role }`,
						    sortable: true,
						  },
						  {
						    name: 'Action',
						    selector: row => <div><Link to={{ pathname:'/user/'+`${ row.id }`}} className="btn btn-success">Update</Link> <button className="btn btn-danger" onClick={ () => this.deactivateUser(`${ row.id }`) }>De-Activate</button></div>,
						    sortable: true,
						  },
						];
	    const { admins } = this.state;
	    const role = this.state.role;
	  	const allAdmins = <DataTable
					        columns={columns}
					        data={admins}
					      />

	    const noAdmins = (
	      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
	        <h4>
	          No admins yet. Why not <Link to="/newUser">create one</Link>
	        </h4>
	      </div>
	    );

	    const userDashboardBtn = <Link
					to={{ pathname: "/dashboard",
			        	  loggedIn: this.state.isLoggedIn,
			        	  user: this.state.current_user
			    		}}
		            className="btn btn-sm custom-button"
		         	role="button"
			    >
		        	Go to Dashboard
		       	</Link>

	    return (
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.current_user}/>
				<div className="d-flex flex-row-reverse">
					{userDashboardBtn}
				</div>
				<div className="py-5">
					<main className="container">
						<div className="text-right mb-3">
							<Link to={`/newUser/${role}`} className="btn btn-md custom-button">
								Create New Admin
							</Link>
							&nbsp;&nbsp;&nbsp;
							<Link to="/superAdminDashboard" className="btn btn-md custom-button">
							 	Go to Super Admin Dashboard
							</Link>
						</div>
						
						<section className="jumbotron jumbotron-fluid text-center">
							<h3>Admins</h3>
							<p className="lead text-muted">
							  All the admins are listed below
							</p>
							<div className="row">
							  { admins.length > 0 ? allAdmins : noAdmins }
							</div>
						</section>
					</main>
				</div>
			</div>
	    );
	  }
}

export default Admins;