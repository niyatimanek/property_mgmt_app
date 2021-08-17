import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';

class Users extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			users: [],
			role: "user"
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
			.then(response => this.setState({ users: response} ))
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
	    const { users } = this.state;
	    const role = this.state.role;
	  	const allUsers = <DataTable
					        title="All Users"
					        columns={columns}
					        data={users}
					      />

	    const noUser = (
	      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
	        <h4>
	          No users yet. Why not <Link to="/newUser">create one</Link>
	        </h4>
	      </div>
	    );

	    return (
			<>
				<section className="jumbotron jumbotron-fluid text-center">
					<div className="container py-5">
						<h1 className="display-4">Users</h1>
						<p className="lead text-muted">
						  All the Users are listed below
						</p>
					</div>
				</section>
				<div className="py-5">
					<main className="container">
						<div className="text-right mb-3">
							<Link to={`/newUser/${role}`} className="btn custom-button">
								Create New User
							</Link>
							&nbsp;&nbsp;&nbsp;
							<Link to="/superAdminDashboard" className="btn custom-button">
							 	Go to Super Admin Dashboard
							</Link>
						</div>
						<div className="row">
						  { users.length > 0 ? allUsers : noUser }
						</div>
					</main>
				</div>
			</>
	    );
	  }
}

export default Users;