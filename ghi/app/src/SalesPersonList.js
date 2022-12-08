import React from 'react';
import { Link } from "react-router-dom";



class SalesPersonList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salespeople: []
        }
    }



    async componentDidMount() {
        const url = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ salespeople: data.salespeople });


        }
    }


    async handleDelete(id) {
        const salespeopleUrl = `http://localhost:8090/api/salespeople/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(salespeopleUrl, fetchConfig);
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
                                        <td>Employee Number</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.salespeople.map(salesperson => {
                                        return (
                                            <tr key={salesperson.id}>
                                                <td>{salesperson.name}</td>
                                                <td>{salesperson.employee_number}</td>
                                                <td><button className="btn btn-dark" onClick={() => this.handleDelete(salesperson.id)}>Fire</button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/salespeople/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Salesperson</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default SalesPersonList;
