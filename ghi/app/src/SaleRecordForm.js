import React from 'react';
import { useNavigate } from 'react-router-dom';


function withNavigate(Component) {
    return (props) => <Component {...props} useNavigate={useNavigate()} />;
}

class SaleRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auto: '',
            autos: [],
            salesperson: '',
            salespeople: [],
            customer: '',
            customers: [],
            price: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.salespeople;
        delete data.customers;
        delete data.autos;
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
                auto: '',
                price: '',
            });
            this.props.useNavigate("/sales/");
        }
    }

    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState)
    }

    async automobileMount() {
        const automobilesUrl = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(automobilesUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ autos: data.autos});
        };
    };

    async salespeopleMount() {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ salespeople: data.salespeople});
        };
    };

    async customerMount() {
        const customerUrl = 'http://localhost:8090/api/customers/';

        const response = await fetch(customerUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ customers: data.customers});
        };
    };
    async componentDidMount() {
        this.automobileMount();
        this.salespeopleMount();
        this.customerMount();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-6">
                        <div className="shadow p-4 mt-4">
                            <h1>Complete a new sale</h1>
                            <form onSubmit={this.handleSubmit} id="create-shoe-form">
                                <div className="mb-3">
                                    <select onChange={this.handleChange} value={this.state.auto} required name="auto" id="auto" className="form-select">
                                        <option value="">Choose an automobile</option>
                                        {this.state.autos.map(auto => { return (<option key={auto.vin} value={auto.vin}>{auto.vin}</option>) })}
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
                                    <input onChange={this.handleChange} value={this.state.price} placeholder="Price" required type="number" name="price"
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
