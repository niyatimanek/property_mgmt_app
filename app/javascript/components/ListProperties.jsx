import React from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class ListProperties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			properties: [],
			successAlert: false
		}
	}

	componentDidMount(){
		const url = `/api/v1/properties/index?is_approved=true`;

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

	buyProperty = (id) => {
		const addDialog = ({onClose}) => {
			const handleClickedNo = () => {
		    	alert('clicked no')
		    	onClose()
		  	}
		  	const handleClickedYes = (id) => {
		    	const url = '/api/v1/properties/buy/'+id;
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
			    .then(() => {
			    	this.setState({successAlert: true})
			    	setTimeout(() => {window.location.reload(false)}, 3000)
			    })
			    .catch(error => console.log(error.message));
		    	onClose();
			}
			return (
			    <div className='add-dialog'>
			      <h3>Buy property</h3>
			      <p>Are you sure you want add this property to your properties list?</p>
			      <div className="add-dialog-buttons">
			        <button className="btn btn-danger" onClick={handleClickedNo}>No</button>
			        &nbsp;&nbsp;&nbsp;
			        <button className="btn btn-success" onClick={() => handleClickedYes(id)}>Yes, add property</button>
			      </div>
			    </div>
			)
		}
	 	confirmAlert({ customUI: addDialog })
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
						    name: 'Status',
						    selector: row => `${ !row.user_id ? 'Available' : 'Sold' }`,
						    sortable: true,
						  },
						  {
						    name: 'Action',
						    selector: row => <div><button className="btn btn-success" disabled={row.user_id} onClick={ () => this.buyProperty(`${ row.id }`) }>Buy</button></div>,
						    sortable: true,
						  },
						];
	    const { properties } = this.state;
	  	const allProperties = <DataTable
					        title="List of Properties"
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

	    var successAlertclassName = this.state.successAlert ? 'alert alert-success mt-5' : 'alert alert-success d-none mt-5';

	    return (
			<>
				<div className={successAlertclassName}>
					<strong>Success! </strong> Property added to your property list.
				</div>
				<div className="py-5">
					<main className="container">
						<div className="row">
						  { properties.length > 0 ? allProperties : noProperty }
						</div>
					</main>
				</div>
			</>
	    );
	}
}

export default ListProperties;