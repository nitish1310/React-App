import React from 'react';

import axios from 'axios';

//Users component 
const Repo = ({ userdata }) =>

    <tr>
        <td>{userdata.id}</td>
        <td >{userdata.name}</td>
        <td>{userdata.username}</td>
        <td>{userdata.email}</td>
        <td>{userdata.address.street}</td>
        <td>{userdata.address.suite}</td>
        <td>{userdata.address.city}</td>
        <td>{userdata.address.zipcode}</td>

        <td>{userdata.phone}</td>
        <td>{userdata.website}</td>
        <td>{userdata.company.name}</td>
        <td>{userdata.company.catchPhrase}</td>
        <td>{userdata.company.bs}</td>
    </tr>;

//Users component extending component class in react library
export default class Users extends React.Component {
    //life cycle method
    constructor(props) {
        super(props);
        // assigning an object to this.state
        this.state = {
            repos: [],
            loading: true,
            error: null,
        };
    }

    //life cycle method (to load data from remote end)
    componentDidMount() {

        //Axios is promise-based async/await library for the readable asynchronous code
        axios
            .get(window.encodeURI(
                `https://jsonplaceholder.typicode.com/users`,
            ),)
            .then(response => {
                const repos = response.data;
                this.setState({
                    repos,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                });
            });
    }
    //rendering component on page & return JSX (extenssion of js)
    renderLoading() {
        return (
            <div>
                Loading...
      </div>
        );
    }

    renderError() {
        return (
            <div>
                <div>
                    Sorry, an error ocurred: {this.state.error.response.data.message}
                </div>
            </div>
        );
    }

    renderList() {
        const { error, repos } = this.state;

        if (error) {
            console.log(error);
            return this.renderError();
        }

        return (
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Street</th>
                        <th>Suite</th>
                        <th>City</th>
                        <th>Zipcode</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Company Name</th>
                        <th>Company CatchPhrase</th>
                        <th>Company bs</th>
                    </tr>
                </thead>
                <tbody>
                    {/*map data in array*/}
                    {repos.map((userdata, index) =>
                        <Repo userdata={userdata} index={index} key={userdata.id} />,
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
