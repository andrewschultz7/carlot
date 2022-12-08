import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesperson: '',
            salespeople: [],
            customer: '',
            customers: [],
            automobile: '',
            automobiles: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.salespeople;
        delete data.customers;
        delete data.automobiles;
        const saleRecordUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(saleRecordUrl, fetchConfig);
        if (response.ok) {


            this.setState({
                salesperson: '',
                customer: '',
                automobile: '',
            });
            this.props.useNavigate("/sales/");
        }

    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async componentDidMount() {
        const automobilesUrl = 'http://localhost:8090/api/automobiles/';

        const response = await fetch(automobilesUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ automobiles: data.automobiles});
        };
    };

    async componentDidMount() {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ salespeople: data.salespeople});
        };
    };

    async componentDidMount() {
        const customerUrl = 'http://localhost:8090/api/customers/';

        const response = await fetch(customerUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ customers: data.customers});
        };
    };


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Complete a new sale</h1>
                            <form onSubmit={this.handleSubmit} id="create-shoe-form">
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                        <option value="">Choose an automobile</option>
                                        {this.state.automobiles.map(automobile => { return (<option key={automobile.id} value={automobile.href}>{automobile.name}</option>) })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.salesperson} required name="salesperson" id="salesperson" className="form-select">
                                        <option value="">Choose a salesperson</option>
                                        {this.state.salespeople.map(salesperson => { return (<option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>) })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a customer</option>
                                        {this.state.customers.map(customer => { return (<option key={customer.id} value={customer.id}>{customer.name}</option>) })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleChange} value={10} placeholder="Price" required type="number" name="price"
                                        id="price" className="form-control" />
                                    <label htmlFor="manufacturer">Price</label>
                                </div>
                                <button className="btn btn-primary">Complete Sale</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default withNavigate(SaleRecordForm);
