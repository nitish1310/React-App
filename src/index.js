import React from 'react';
import { render } from 'react-dom';

import Users from './Users';
import Posts from './Posts';
import Albums from './Albums';
import Comments from './Comments';
import Todos from './Todos';
import Photos from './Photos';
import './styles.css';

//Component
const App = () =>


    <div>
        <h1>Resource Details</h1>
        <div id="users">
            <h2 >Users</h2>
            {/*Render data from Users*/}
            <Users />
        </div>
        <div id="posts">
            <h2>Posts</h2>
            {/*Render data from Posts*/}
            <Posts />
        </div>
        <div id="albums">
            <h2>Albums</h2>
            {/*Render data from Albums*/}
            <Albums />
        </div>
        <div id="comments">
            <h2>Comments</h2>
            {/*Render data from Comments*/}
            <Comments />
        </div>
        <div id="todos">
            <h2>Todos</h2>
            {/*Render data from Todos*/}
            <Todos />
        </div>
        <div id="photos">
            <h2>Photos</h2>
            {/*Render data from Photos*/}
            <Photos />
        </div>
    </div>;

//rendering app component into element with id 'root'
render(<App />, document.getElementById('root'));
