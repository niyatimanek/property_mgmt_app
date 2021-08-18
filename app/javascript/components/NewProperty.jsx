import React from "react";
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Header from "../components/Header";

class NewUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			city: "",
			state: "",
			zipcode: "",
			country: "",
			is_approved: true,
			admin_id: "",
			owners: [],
			errorMessage: [],
			isLoggedIn: props.location.loggedIn,
	      	current_user: props.location.user
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		const url = "/api/v1/users/index?role[]=admin&role[]=super_admin";
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok")
			})
			.then(response => { 
				this.setState({
					owners: response,
					admin_id: response[0].id
				})
			})
			.catch(() => this.props.history.push("/dashboard"))
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	selectCountry(val){
		this.setState({ country: val });
	}

	selectState(val){
		this.setState({ state: val });	
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/api/v1/properties/create";
		const { name, address, city, state, zipcode, country, is_approved, admin_id } = this.state;

		const body = {
			name,
			address,
			city,
			state,
			zipcode,
			country,
			is_approved,
			admin_id
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
		.then(response => this.props.history.push(`/properties`))
      	.catch(error => {
      		this.setState({ errorMessage: Object.entries(error.errors).map(([key,value],i) => `${key} ${value}` ) });
      		console.log('There was an error!', error)
      	});
	}

	render(){
		const { name, address, city, state, zipcode, country, is_approved, owners } = this.state;
		const allOwners = owners.map((owner, index) => (
			<option key={index} value={owner.id}>{`${owner.first_name} ${owner.last_name}`}</option>
		));
		const approval_status = [{name: "Approved", value: true}, {name: "Rejected", value: false}];
		const approvals_list = approval_status.map((approval, index) => (
			<option key={index} value={approval.value}>{`${approval.name}`}</option>
		));

		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.current_user}/>
				
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
					      Add a new property
					    </h1>
					    <form onSubmit={this.onSubmit}>
					      <div className="form-group">
					        <label htmlFor="name">Name *</label>
					        <input
					          type="text"
					          name="name"
					          id="name"
					          className="form-control"
					          required
					          onChange={this.onChange}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="address">Address *</label>
					        <input
					          type="text"
					          name="address"
					          id="address"
					          className="form-control"
					          required
					          onChange={this.onChange}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="city">City *</label>
					        <input
					          type="text"
					          name="city"
					          id="city"
					          className="form-control"
					          required
					          onChange={this.onChange}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="zipcode">Zip code *</label>
					        <input
					          type="number"
					          name="zipcode"
					          id="zipcode"
					          className="form-control"
					          required
					          onChange={this.onChange}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="state">State *</label>
					        <RegionDropdown
						        country={country}
						        value={state}
						        onChange={(val) => this.selectState(val)}
						        className="form-control"
						    />
					      </div>
					      <div className="form-group">
					        <label htmlFor="country">Country *</label>
					        <CountryDropdown 
					        	name="country"
					        	value={country}
					        	onChange={(val) => this.selectCountry(val)} 
					        	className="form-control" 
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="owner">Approval Status *</label>
					        <select 
					        	name="is_approved"
					        	id="is_approved"
					        	className="form-control" 
					        	onChange={this.onChange}>
					        	{approvals_list}
					        </select>
					      </div>
					      <div className="form-group">
					        <label htmlFor="owner">Owner *</label>
					        <select 
					        	name="admin_id"
					        	id="admin_id"
					        	className="form-control" 
					        	onChange={this.onChange}>
					        	{allOwners}
					        </select>
					      </div>
					      <button type="submit" className="btn custom-button mt-3">
					        Create Property
					      </button>
					      <Link to="/properties" className="btn btn-link mt-3">
					        Back to properties
					      </Link>
					    </form>
				  	</div>
				</div>
			</div>
		);
	}
}

export default NewUser;
