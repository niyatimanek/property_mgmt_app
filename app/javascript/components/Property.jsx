import React from "react";
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Header from "../components/Header";

class Property extends React.Component {
	constructor(props) {
		super(props);
		this.state = { property: {
				id: this.props.id,
				name: '',
				address: '',
				city: '',
				zipcode: '',
				country: '', 
				is_approved: '',
				admin_id: ''
			},
			errorMessage: [],
			owners: [],
			isLoggedIn: props.location.loggedIn,
	      	current_user: props.location.user
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

		const url = `/api/v1/properties/show/${id}`;
		const url1 = "/api/v1/users/index?role[]=admin&role[]=super_admin";

		Promise.all([fetch(url), fetch(url1)])
			.then(([res1, res2]) => { 
				return Promise.all([res1.json(), res2.json()]) 
			})
			.then(([res1, res2]) => {
				// set state in here
				this.setState({
					property: res1,
					owners: res2,
		 			admin_id: res2[0].id
				})
			})
			.catch(() => this.props.history.push("/properties"));
	}

	onChange(event) {
		var property = {...this.state.property};
		property[event.target.name] = event.target.value;
		this.setState({property});
	}

	selectCountry(val){
		var property = {...this.state.property};
		property.country = val;
		this.setState({ property });
	}

	selectState(val){
		var property = {...this.state.property};
		property.state = val;
		this.setState({ state });	
	}

	onSubmit() {
		event.preventDefault();
		const url = "/api/v1/properties/update/"+this.state.property.id;
		const { name, address, city, state, zipcode, country, is_approved, admin_id } = this.state.property;

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
		.then(response => this.props.history.push(`/properties`))
      	.catch(error => {
      		this.setState({ errorMessage: Object.entries(error.errors).map(([key,value],i) => `${key} ${value}` ) });
      		console.log('There was an error!', error)
      	});
	}

	render(){
		const { property } = this.state;
		const allOwners = this.state.owners.map((owner, index) => (
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
					      Edit Property
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
					          defaultValue={property.name}
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
					          defaultValue={property.address}
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
					          defaultValue={property.city}
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
					          defaultValue={property.zipcode}
					        />
					      </div>
					      <div className="form-group">
					        <label htmlFor="state">State *</label>
					        <RegionDropdown
						        country={property.country}
						        value={property.state}
						        onChange={(val) => this.selectState(val)}
						        className="form-control"
						    />
					      </div>
					      <div className="form-group">
					        <label htmlFor="country">Country *</label>
					        <CountryDropdown 
					        	name="country"
					        	value={property.country}
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
					        	onChange={this.onChange}
					        	value={property.is_approved}>
					        	{approvals_list}
					        </select>
					      </div>
					      <div className="form-group">
					        <label htmlFor="owner">Owner *</label>
					        <select 
					        	name="admin_id"
					        	id="admin_id"
					        	className="form-control" 
					        	onChange={this.onChange}
					        	value={property.admin_id}>
					        	{allOwners}
					        </select>
					      </div>
					      <button type="submit" className="btn custom-button mt-3">
					        Update Property
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

export default Property;