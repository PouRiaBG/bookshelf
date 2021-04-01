import React , {useState} from 'react';
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'

const LoginForm = (props)=>{
    const {name, openHandler, open, showData} = props;
    function submitHandler(event){
        event.preventDefault()
        const {username, pass} = event.target.elements;

        showData({
            username : username.value,
            passwrod : pass.value
        })
    }
    return (
        <Dialog aria-label="Form" isOpen={open}>
                <button onClick={() => openHandler(false)}>close</button>
                <h1>{name}</h1>

                <form onSubmit={submitHandler} >
                    <label htmlFor="username">username </label>
                    <input id="username" type="text"/><br/>
                    <label htmlFor="pass">password</label>
                    <input id="pass" type="password"/><br/>
                    <button type="submit">{name}</button>
                </form>
        </Dialog>
    )
}

const App = ()=>{
    const [open, isOpen] = useState(false);
    const [name, setName] = useState('');

    function clickHandler(event){
        const {innerText : buttonName} = event.target;
        setName(buttonName);
        isOpen(true);
    }
    
    function showData(data){
        console.log(data)
    }
    return (
        <>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <button onClick={clickHandler}>Login</button><br/>
            <button onClick={clickHandler}>Register</button>

            <LoginForm 
            showData={showData}
            open={open}
            name={name} 
            openHandler={isOpen}
            />
        </>
    )
}

const root = document.getElementById('root');
ReactDOM.render(<App/> , root);