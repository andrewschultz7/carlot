import React from 'react';

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin2: '',
            appointments: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit = this.filtered.bind(this);
    };


    async componentDidMount() {
        const url = 'http://localhost:8080/api/history/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ appointments: data.appointments });


        };
    };

    filtered(vin2) {
        let appointment_list;
        if (vin2 === '') {
            appointment_list = this.state.appointments
        } else {
            appointment_list = this.state.appointments.filter(appointment => appointment.vin.includes(vin2))
        }
        return (
            appointment_list.map(appointment => {
                return (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.name}</td>
                        <td>{new Date(appointment.date_time).toDateString()}</td>
                        <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                        <td>{appointment.technician.name}</td>
                        <td>{appointment.reason}</td>
                    </tr>
                );
            }
            ))
    };

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
        };
        const response = await fetch(binUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                vin2: '',
            });
            this.props.useNavigate("/manufacturers/");
        };

    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <h1>Service History</h1>
                            <table className="table table-lite table-striped">
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
                                    {this.filtered(this.state.vin2)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default ServiceHistory;
