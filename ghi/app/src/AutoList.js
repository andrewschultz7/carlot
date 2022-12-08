import React from 'react';
import { Link } from "react-router-dom";



class AutoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: []
        }
    }



    async componentDidMount() {
        const url = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ autos: data.autos });


        }
    }


    async handleDelete(id) {
        const autoUrl = `http://localhost:8100/api/automobiles/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {

            this.componentDidMount();
        }

    }




    render() {
        return (
            <div className="container">
                <div className="row">
                    {/* <div className="offset-3 col-6"> */}
                    <div className="col">
                        <div className="shadow p-4 mt-4">
                            <table className="table table-lite table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <td>VIN</td>
                                        <td>Color</td>
                                        <td>Year</td>
                                        <td>Model</td>
                                        <td>Manufacturer</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.autos.map(autos => {
                                        return (
                                            <tr key={autos.id}>
                                                <td>{autos.vin}</td>
                                                <td>{autos.color}</td>
                                                <td>{autos.year}</td>
                                                <td>{autos.model.name}</td>
                                                <td>{autos.model.manufacturer.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/autos/new"
                                    className="d-block fs-3 p-2 bg-success text-white text-center text-decoration-none">New Auto</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default AutoList;
