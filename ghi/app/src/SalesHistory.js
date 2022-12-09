import React from 'react';
import { Link } from "react-router-dom";

function FilteredSalesHistory({sale}) {
    return (
        <tr key={sale.salesperson.id}>
            <td>{sale.salesperson.name}</td>
            <td>{sale.customer.name}</td>
            <td>{sale.auto.vin}</td>
            <td>{sale.price}</td>
       </tr>
    )
}
class SalesHistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesperson: '',
            salespeople: [],
            sales: [],
        }
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event) {
        // const newState = {};
        // newState[event.target.id] = event.target.value;
        // this.setState(newState)
        const value = event.target.value;
        this.setState({salesperson: value});
        const recordsUrl = "http://localhost:8090/api/sales/";
        const recordResponse = await fetch(recordsUrl);
        const recordsData = await recordResponse.json();
        this.setState({sales: recordsData.sales});

    }

    async componentDidMount() {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';

        const response = await fetch(salespeopleUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ salespeople: data.salespeople });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {/* <div className="offset-3 col-6"> */}
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <h1>Salesperson History</h1>
                            <div className="mb-3">
                                <select onChange={this.handleChange} value={this.state.salesperson} required name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {console.log(this)};
                                    {this.state.salespeople?.map(salesperson => { return (<option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>) })}
                                </select>
                            </div>
                            <table className="table table-success table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <td>Sales Person</td>
                                        <td>Employee Number</td>
                                        <td>Customer</td>
                                        <td>Automobile</td>
                                        <td>Price</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.sales.filter(x => x.salesperson.id == this.state.salesperson).map(sale => {
                                        return (
                                            <tr key={sale.id}>
                                                <td>{sale.salesperson.name}</td>
                                                <td>{sale.salesperson.employee_number}</td>
                                                <td>{sale.customer.name}</td>
                                                <td>{sale.auto.vin}</td>
                                                <td>{sale.price}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default SalesHistoryList;
