import React from 'react';
import { Link } from "react-router-dom";


class SalesHistoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sale: '',
            sales: [],
            salesperson: '',
            salespeople: [],
        }
    }

    filtered() {
        let sales_list;
        sales_list = this.state.sales.filter(sale => sale.vin.includes())

    return (
        sales_list.map(sale => {
            return (
                <tr key={sale.id}>
                    <td>{sale.salesperson.name}</td>
                    <td>{sale.customer.name}</td>
                    <td>{sale.automobile.vin}</td>
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

    async componentDidMount() {
        const url = 'http://localhost:8090/api/saleshistory/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ sales: data.sales });
        };
    };

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
                                <select onChange={this.handleChange} value={this.state.salesperson.name} required name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Choose a salesperson</option>
                                    {this.state.salespeople.map(salesperson => { return (<option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>) })}
                                </select>
                            </div>
                            <table>
                                <tbody>
                                    {/* INSERT TABLE HERE IF BROKEN */}
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
