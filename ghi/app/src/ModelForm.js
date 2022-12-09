import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class ModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
            manufacturer_id: '',
            manufacturers: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers;
        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            });
            this.props.useNavigate("/models/");
        }

    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });


        }
    }



    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Add a New Model</h1>
                            <form onSubmit={this.handleSubmit} id="create-model-form">
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.name} placeholder="Name" required type="text" name="name"
                                        id="name" className="form-control" />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={this.state.picture_url} placeholder="picture_url" required type="url" name="picture_url"
                                        id="picture_url" className="form-control" />
                                    <label htmlFor="picture_url">Picture URL</label>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.manufacturer_id} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                                        <option value="">Choose a manufacturer</option>
                                        {this.state.manufacturers.map(manufacturer => { return (<option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>) })}
                                    </select>
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

export default withNavigate(ModelForm);
