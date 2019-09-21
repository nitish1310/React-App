import React from 'react';

import axios from 'axios';

const Repo = ({ tododata }) =>
    <tr>
        <td>{tododata.id}</td>
        <td >{tododata.title}</td>
        <td>{tododata.completed}</td>
    </tr>;

export default class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        axios
            .get(
                window.encodeURI(
                    `https://jsonplaceholder.typicode.com/todos`,
                ),
            )
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
                        <th>Title</th>
                        <th>Completed Status</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((tododata, index) =>
                        <Repo tododata={tododata} index={index} key={tododata.id} />,
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
