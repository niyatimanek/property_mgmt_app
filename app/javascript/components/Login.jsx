import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
	      username: '',
	      password: '',
	      errors: '',
	      isLoggedIn: false,
	      user: {}
	    };
	}

	handleLogin = (data) => {
	    this.setState({
	      isLoggedIn: true,
	      user: data.user
	    })
	}

	handleChange = (event) => {
	    const {name, value} = event.target
	    this.setState({
	      [name]: value
	    })
	};

	handleSubmit = (event) => {
		event.preventDefault()
	    const {username, password} = this.state;
	    const url = '/login';
	    let user = {
	      username: username,
	      password: password
	    }

	    const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "Post",
			headers: {
				"X-CSRF-Token": token,
        		"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
		.then(async response => {
			const isJson = response.headers.get('content-type')?.includes('application/json');
   		    const data = isJson && await response.json();
            if (data.logged_in){
            	this.handleLogin(data);
            	this.props.history.push('/dashboard')
            }else{
            	const error = data || response.status;
                return Promise.reject(error);
            }
		})
      	.catch(error => {
           	this.setState({ errors: error.errors })
      		console.log('There was an error!', error)
      	});
	}

	render(){
		return (
			<>
				{ this.state.errors.length > 0 &&
					<div className="alert alert-danger" role="alert">
						<ul className="list-unstyled">
							{this.state.errors.map(error => {
        														return <li key={error}>{error}</li>
          													})}
						</ul>
					</div>
				}
				<h3 className="text-center">
		          Please Log In
		        </h3>
		        <br />
		        <form className="text-center" onSubmit={this.handleSubmit}>
		          <div className="form-group">
		            <label>
		              <p>Username</p>
		              <input 
		              	type="text" 
		              	className="form-control" 
		              	name="username"
						id="username"
		              	onChange={this.handleChange} 
		              />
		            </label>
		          </div>
		          <br />
		          <div className="form-group">
		            <label>
		              <p>Password</p>
		              <input 
		              	type="password" 
		              	className="form-control"
		              	name="password"
						id="password"
		              	onChange={this.handleChange}	
		              />
		            </label>
		          </div>
		          <div className="form-group">
		            <button type="submit" className="btn custom-button mt-3">Submit</button>
		          </div>
		        </form>
	        </>
		)
	}
}

export default withRouter(Login);