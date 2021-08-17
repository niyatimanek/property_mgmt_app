import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ListProperties from "../components/ListProperties";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isLoggedIn: false
		}
	}

	componentDidMount(){
		const url = '/logged_in';
		fetch(url)
			.then(async response => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
   		    	const data = isJson && await response.json();
				if (data.logged_in) {
					this.setState({ user: data.user, isLoggedIn: data.logged_in} )
				}else{
					this.props.history.push("/")
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
		return(
			<div className="container">
				<Header loggedIn={this.state.isLoggedIn} user={this.state.user}/>
				<h3>{`Welcome, ${userParams.first_name} ${userParams.last_name}`}</h3>
				<div className="padding-xs">
					{ userParams.role == "super_admin" ? superAdminDashboardBtn : ''}
					&nbsp;&nbsp;&nbsp;&nbsp;
					{ ( userParams.role == "super_admin" || userParams.role == "admin" ) ? adminDashboardBtn : ''}
				</div>
				<ListProperties />
			</div>
		);
	}
}

export default Dashboard;