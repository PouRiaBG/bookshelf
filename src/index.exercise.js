import React from 'react';
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'

const App = ()=>{
    function clickHandler(event){
        const {innerText : buttonName} = event.target;
        alert(`You clicked ${buttonName}`)
    }
    return (
        <>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <button onClick={clickHandler}>login</button><br/>
            <button onClick={clickHandler}>register</button>
        </>
    )
}

const root = document.getElementById('root');
ReactDOM.render(<App/> , root);