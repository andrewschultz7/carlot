import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}



class TechnicianForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employee_id: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        const techUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                name: '',
                employee_id: '',
            });
            this.props.useNavigate("/technicians/");
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
                            <h1>Add a New Technician</h1>
                            <form onSubmit={this.handleSubmit} id="create-technician-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="Presenter name" required type="text" name="name"
                                        id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.employee_id} placeholder="employee_id" required type="text" name="employee_id"
                                        id="employee_id" className="form-control" />
                                    <label htmlFor="employee_id">employee_id</label>
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

export default withNavigate(TechnicianForm);
