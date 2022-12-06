import React from 'react';
import { Link } from "react-router-dom";



class ShoesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturers: []
        }
    }



    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });


        }
    }


    async handleDelete(id) {
        const shoesUrl = `http://localhost:8100/api/manufacturers/${id}`
        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(shoesUrl, fetchConfig);
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
                            <table className="table table-success table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <td>Name</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.manufacturers.map(manufacturers => {
                                        return (
                                            <tr key={manufacturers.id}>
                                                <td>{manufacturers.name}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/shoes/new"
                                    className="d-block fs-3 p-2 bg-secondary text-white text-center text-decoration-none">New Manufacturer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    };
};

export default ManufacturerList;
