import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class ServiceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vin: '',
            name: '',
            date_time: '',
            technician: '',
            technicians: [],
            reason: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians
        const binUrl = 'http://localhost:8080/api/service/';
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
                vin: '',
                name: '',
                date_time: '',
                reason: '',
            });
            this.props.useNavigate("/service/");
        }

    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });


        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a new appointment</h1>
                            <form onSubmit={this.handleSubmit} id="create-appointment-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.vin} placeholder="vin" required type="text" name="vin"
                                        id="vin" className="form-control" />
                                    <label htmlFor="vin">VIN</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="name" required type="text" name="name"
                                        id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.date_time} placeholder="date_time" type="datetime-local" name="date_time" id="date_time"
                                        className="form-control" />
                                    <label htmlFor="date_time">date_time</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                                        <option value="">Choose a technician</option>
                                        {this.state.technicians.map(technician => { return (<option key={technician.employee_id} value={technician.employee_id}>{technician.name}</option>) })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.reason} placeholder="reason" type="text" name="reason" id="reason"
                                        className="form-control" />
                                    <label htmlFor="reason">Reason</label>
                                </div>
                                <button className="btn btn-primary">Create</button>

                            </form>

                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default withNavigate(ServiceForm);
