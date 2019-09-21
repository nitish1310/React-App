import React from 'react';

import axios from 'axios';

const Repo = ({ photodata }) =>
    <tr>
        <td>{photodata.id}</td>
        <td >{photodata.title}</td>
        <td> <img src={photodata.thumbnailUrl} alt="" /> </td>

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
                    `https://jsonplaceholder.typicode.com/photos`,
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
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((photodata, index) =>
                        <Repo photodata={photodata} index={index} key={photodata.id} />,
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
