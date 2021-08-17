import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			username: "",
			password: "",
			role: this.props.match.params.role,
			errorMessage: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/api/v1/users/create";
		const { first_name, last_name, username, password, role } = this.state;

		if( first_name.length == 0 || last_name.lenght == 0 || password.length == 0 )
			return;

		const body = {
			first_name,
			last_name,
			username,
			password,
			role
		}

		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "Post",
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
		const role = this.state.role;
		return(
			<div className="container mt-5">
				<div className="row">
					{ this.state.errorMessage.length > 0 &&
						<div className="alert alert-danger" role="alert">
							<ul className="list-unstyled">
								{this.state.errorMessage.map( (e,i) => <li key={i}>{e}</li>)}
							</ul>
						</div>
					}
				  	<div className="col-sm-12 col-lg-6 offset-lg-3">
					    <h1 className="font-weight-normal mb-5">
					      {`Add a new ${role}`}
					    </h1>
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
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="password">Password *</label>
					        <input
					          type="password"
					          name="password"
					          id="password"
					          className="form-control"
					          required
					          onChange={this.onChange}
					        />
					      </div>
					      <button type="submit" className="btn custom-button mt-3">
					        {`Create ${role}`}
					      </button>
					      <Link to={`/${role}`} className="btn btn-link mt-3">
					        {`Back to ${role}`}
					      </Link>
					    </form>
				  	</div>
				</div>
			</div>
		);
	}
}

export default NewUser;
