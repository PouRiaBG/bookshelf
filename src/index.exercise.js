import React , {useState} from 'react';
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'

const App = ()=>{
    const [open, isOpen] = useState(false);
    const [name, setName] = useState(null);

    function clickHandler(event){
        const {innerText : buttonName} = event.target;
        setName(buttonName);
        isOpen(true);
    }
    
    return (
        <>
            <Logo width="80" height="80" />
            <h1>Bookshelf</h1>
            <button onClick={clickHandler}>Login</button><br/>
            <button onClick={clickHandler}>Register</button>

            <Dialog aria-label="Form" isOpen={open}>
                <button onClick={() => isOpen(false)}>close</button>
                <h1>{name}</h1>
            </Dialog>
        </>
    )
}

const root = document.getElementById('root');
ReactDOM.render(<App/> , root);