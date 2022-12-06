import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            model_id: '',
            models: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.models
        const binUrl = 'http://localhost:8100/api/automobiles/';
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
                color: '',
                year: '',
                vin: '',
                model_id: '',
            });
            this.props.useNavigate("/automobiles/");
        }

    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ models: data.models });


        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a new shoe</h1>
                            <form onSubmit={this.handleSubmit} id="create-shoe-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.color} placeholder="Presenter name" required type="text" name="color"
                                        id="color" className="form-control" />
                                    <label htmlFor="color">Color</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.year} placeholder="year" required type="text" name="year"
                                        id="year" className="form-control" />
                                    <label htmlFor="year">Year</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.vin} placeholder="vin" type="text" name="vin" id="vin"
                                        className="form-control" />
                                    <label htmlFor="vin">VIN</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.models} required name="bin" id="bin" className="form-select">
                                        <option value="">Choose a model</option>
                                        {this.state.models.map(model => { return (<option key={models.id} value={models.href}>{models.name}</option>) })}
                                    </select>
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

export default withNavigate(AutoForm);
