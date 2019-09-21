import React from 'react';

import axios from 'axios';

const Repo = ({ postdata }) =>
    <tr>
        <td>{postdata.id}</td>
        <td >{postdata.title}</td>
        <td>{postdata.body}</td>
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
                    `https://jsonplaceholder.typicode.com/posts`,
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
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {repos.map((postdata, index) =>
                        <Repo postdata={postdata} index={index} key={postdata.id} />,
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return this.state.loading ? this.renderLoading() : this.renderList();
    }
}
