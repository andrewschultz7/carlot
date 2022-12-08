import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin2: '',
            appointments: [],
            // changed: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.filtered.bind(this);
    }


    async componentDidMount() {
        const url = 'http://localhost:8080/api/history/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ appointments: data.appointments });


        }
    }

    filtered() {
        if (this.state.vin2 == '') {
            return (
                this.state.appointments.map(appointments => {
                    return (
                        <tr key={appointments.id}>
                            <td>{appointments.vin}</td>
                            <td>{appointments.name}</td>
                            <td>{appointments.date_time}</td>
                            <td>{appointments.date_time}</td>
                            <td>{appointments.technician.name}</td>
                            <td>{appointments.reason}</td>
                        </tr>
                    );
                })
            )
        } else {
            return (
                this.state.appointments.filter((appointments) => appointments.vin === this.state.vin2).map(appointments => {
                    return (
                        <tr key={appointments.id}>
                            <td>{appointments.vin}</td>
                            <td>{appointments.name}</td>
                            <td>{appointments.date_time}</td>
                            <td>{appointments.date_time}</td>
                            <td>{appointments.technician.name}</td>
                            <td>{appointments.reason}</td>
                        </tr>
                    );
                })
            )
        }
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers
        const binUrl = 'http://localhost:8080/api/history/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(binUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                vin2: '',
            });
            this.props.useNavigate("/manufacturers/");
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
                                        <td><input onChange={this.handleChange} value={this.state.vin2} placeholder="Enter VIN" required type="text" name="vin2"
                                            id="vin2" className="form-control" />
                                        </td></tr>
                                    <tr>
                                        <td>VIN</td>
                                        <td>Name</td>
                                        <td>Date</td>
                                        <td>Time</td>
                                        <td>Technician</td>
                                        <td>Reason</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.filtered()}
                                </tbody>
                            </table>
                            {/* <div>
                                <Link to="/service/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New appointments</Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default ServiceHistory;
