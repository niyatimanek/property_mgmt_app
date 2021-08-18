import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: {
				id: this.props.id,
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				role: '', 
			},
			errorMessage: [],
			isLoggedIn: props.loggedIn,
	      	current_user: props.user
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {	
		const {
			match: {
				params: { id }
			}
		} = this.props;

		const url = `/api/v1/users/show/${id}`;

		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok")
			})
			.then(response => this.setState({ user: response} ))
			.catch(() => this.props.history.push("/users"))
	}

	onChange(event) {
		//this.setState({ user[event.target.name]: event.target.value });
		var user = {...this.state.user}
		user[event.target.name] = event.target.value;
		this.setState({user});
	}

	onSubmit() {
		event.preventDefault();
		const url = "/api/v1/users/update/"+this.state.user.id;
		const { first_name, last_name, username, role } = this.state.user;

		if( first_name.length == 0 || last_name.length == 0)
			return;

		const body = {
			first_name,
			last_name,
			username,
			role
		}
		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "Put",
			headers: {
				"X-CSRF-Token": token,
        		"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(async response => {
			const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
            	const error = data || response.status;
                return Promise.reject(error);
            }

		})
		.then(response => this.props.history.push(`/${role}s`))
      	.catch(error => {
      		this.setState({ errorMessage: Object.entries(error.errors).map(([key,value],i) => `${key} ${value}` ) });
      		console.log('There was an error!', error)
      	});
	}

	render(){
		const { user } = this.state;
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

		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.current_user}/>
				<div className="d-flex flex-row-reverse">
					{userDashboardBtn}
				</div>
				<div className="row">
					{ this.state.errorMessage.length > 0 &&
						<div className="alert alert-danger" role="alert">
							<ul className="list-unstyled">
								{this.state.errorMessage.map( (e,i) => <li key={i}>{e}</li>)}
							</ul>
						</div>
					}
				  	<div className="col-sm-12 col-lg-6 offset-lg-3">
					    <h3 className="font-weight-normal mb-5">
					      {`Edit ${user.role}`} 
					    </h3>
					    <form onSubmit={this.onSubmit}>
					      <div className="form-group">
					        <label htmlFor="firstName">First Name *</label>
					        <input
					          type="text"
					          name="first_name"
					          id="firstName"
					          className="form-control"
					          required
					          onChange={this.onChange}
					          defaultValue={user.first_name}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="lastName">Last Name *</label>
					        <input
					          type="text"
					          name="last_name"
					          id="lastName"
					          className="form-control"
					          required
					          onChange={this.onChange}
					          defaultValue={user.last_name}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="userName">User Name *</label>
					        <input
					          type="text"
					          name="username"
					          id="userName"
					          className="form-control"
					          required
					          onChange={this.onChange}
					          defaultValue={user.username}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="role">Role *</label>
					        <input
					          type="text"
					          name="role"
					          id="role"
					          className="form-control"
					          required
					          disabled
					          value={user.role}
					        />
					      </div>
					      <button type="submit" className="btn custom-button mt-3">
					        {`Update ${user.role}`}
					      </button>
					      <Link to={`/${user.role}s`} className="btn btn-link mt-3">
					        {`Back to ${user.role}s`}
					      </Link>
					    </form>
				  	</div>
				</div>
			</div>
		);
	}
}

export default User;