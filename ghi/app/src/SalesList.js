import React from 'react';
import { Link } from "react-router-dom";


class SaleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sales: []
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ sales: data.sales });
        }
    }

    async handleDelete(id) {
        const salesUrl = `http://localhost:8090/api/sales/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salesUrl, fetchConfig);
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
                                        <td>Sales Person</td>
                                        <td>Employee Number</td>
                                        <td>Customer</td>
                                        <td>Automobile</td>
                                        <td>Price</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales.map(sale => {
                                        return (
                                            <tr key={sale.id}>
                                                <td>{sale.salesperson.name}</td>
                                                <td>{sale.salesperson.employee_number}</td>
                                                <td>{sale.customer.name}</td>
                                                <td>{sale.auto.vin}</td>
                                                <td>{sale.price}</td>
                                                <td><button className="btn btn-dark" onClick={() => this.handleDelete(sale.id)}>Lemon</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/sales/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Sale</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default SaleList;
