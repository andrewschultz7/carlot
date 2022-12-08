import React from 'react';
import { Link } from "react-router-dom";

class ServiceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleFinished = this.handleFinished.bind(this);
    };

    async componentDidMount() {
        const url = 'http://localhost:8080/api/service/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ appointments: data.appointments });
        }
    }

    async handleFinished(id) {
        // const data = { ...this.state }
        const appUrl2 = `http://localhost:8080/api/service/${id}/`
        const fetchConfig2 = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(appUrl2, fetchConfig2);

        if (response.ok) {

            this.componentDidMount();
        }

    }

    async handleDelete(id) {
        const appUrl = `http://localhost:8080/api/service/${id}/`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(appUrl, fetchConfig);
        if (response.ok) {

            this.componentDidMount();
        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <table className="table table-lite table-striped">
                                <thead className="table-secondary">
                                    <tr>
                                        <td>VIN</td>
                                        <td>Name</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                        <td>Technician</td>
                                        <td>Reason</td>
                                        <td>VIP</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.appointments.map(appointments => {
                                        return (
                                            <tr key={appointments.id}>
                                                <td>{appointments.vin}</td>
                                                <td>{appointments.name}</td>
                                                <td>{appointments.date_time.substring(0, 10)}</td>
                                                <td>{appointments.date_time.substring(11, 19)}</td>
                                                <td>{appointments.technician.name}</td>
                                                <td>{appointments.reason}</td>
                                                <td>{String(appointments.vip)}</td>
                                                <td><label className="btn btn-danger" onClick={() => this.handleDelete(appointments.id)} >Cancel</label>
                                                    <label className="btn btn-secondary" onClick={() => this.handleFinished(appointments.id)} >Finished</label></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/service/new"
                                    className="d-block fs-3 p-2 bg-success text-white text-center text-decoration-none">New appointments</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}

export default ServiceList;
