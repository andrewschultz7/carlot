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
        const data = { ...this.state }
        // console.log(this.state.appointments, "TTTTTTTTTTTTTT2")
        // data2 = JSON.stringify(data)
        const appUrl2 = `http://localhost:8080/api/service/${id}/`
        const fetchConfig2 = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(appUrl2, fetchConfig2, "AAAAAAAAAAAABBBBBBBB")
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
                    {/* <div className="offset-3 col-6"> */}
                    <div className="col">
                        <div className="shadow p-4 mt-4">

                            <table className="table table-success table-striped">
                                <thead className="table-dark">

                                    <tr>
                                        <td>VIN</td>
                                        <td>Name</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                        <td>Technician</td>
                                        <td>Reason</td>
                                        <td>VIP</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.appointments.map(appointments => {
                                        return (
                                            <tr key={appointments.id}>
                                                <td>{appointments.vin}</td>
                                                <td>{appointments.name}</td>
                                                <td>{appointments.date_time}</td>
                                                <td>{appointments.date_time.date}</td>
                                                <td>{appointments.technician.name}</td>
                                                <td>{appointments.reason}</td>
                                                <td>{String(appointments.vip)}</td>
                                                <td><button className="btn btn-dark" onClick={() => this.handleDelete(appointments.id)} >Cancel</button></td>
                                                <td><button className="btn btn-dark" onClick={() => this.handleFinished(appointments.id)} >Finished</button></td>
                                                <td>{String(appointments.finished)}</td>
                                            </tr>

                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/service/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New appointments</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
}

export default ServiceList;
