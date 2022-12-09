import React from 'react';
import { Link } from "react-router-dom";



class TechnicianList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            technicians: []
        }
    }



    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });


        }
    }


    async handleDelete(id) {
        const techUrl = `http://localhost:8080/api/technicians/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(techUrl, fetchConfig);
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
                            <h1>Technicians</h1>
                            <table className="table table-lite table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <td>Name</td>
                                        <td>employee_id</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.technicians.map(technicians => {
                                        return (
                                            <tr key={technicians.employee_id}>
                                                <td>{technicians.name}</td>
                                                <td>{technicians.employee_id}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/technicians/new"
                                    className="d-block fs-3 p-2 bg-success text-white text-center text-decoration-none">New Technician</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default TechnicianList;
