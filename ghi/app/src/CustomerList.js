import React from 'react';
import { Link } from "react-router-dom";


class CustomerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: []
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/customers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ customers: data.customers });
        }
    }

    async handleDelete(id) {
        const customersUrl = `http://localhost:8090/api/customer/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(customersUrl, fetchConfig);
        if (response.ok) {
            this.componentDidMount();
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {/* <div className="offset-3 col-6"> */}
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <table className="table table-success table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <td>Name</td>
                                        <td>Address</td>
                                        <td>Phone number</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <tr key={customer.id}>
                                                <td>{customer.name}</td>
                                                <td>{customer.address}</td>
                                                <td>{customer.phone}</td>
                                                <td><button className="btn btn-dark" onClick={() => this.handleDelete(customer.id)}>Ban</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/customers/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Customer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default CustomerList;
