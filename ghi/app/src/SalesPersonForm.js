import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_number: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        // delete data.manufacturers; *******NOT SURE WHAT TO DELETE - ANYTHING?*******
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(salespeopleUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                name: '',
                employee_number: '',
            });
            this.props.useNavigate("/salespeople/");
        }

    }

    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a new sales person</h1>
                            <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name"
                                        id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.employee_number} placeholder="employee_number" required type="text" name="employee_number"
                                        id="employee_number" className="form-control" />
                                    <label htmlFor="employee_number">Employee Number</label>
                                </div>
                                <button className="btn btn-primary">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default withNavigate(SalesPersonForm);
