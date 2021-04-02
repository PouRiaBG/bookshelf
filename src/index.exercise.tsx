import React , {useState} from 'react';
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'

interface Props {
    name : string;
    open : boolean;
    openHandler : React.Dispatch<React.SetStateAction<boolean>>;
    showData : (data : Data) => void
}

interface Data {
    username : string;
    password : string;
}


const LoginForm = (props : Props)=>{
    const {name, openHandler, open, showData} = props;
    function submitHandler(event: any){
        event.preventDefault()
        const {username, pass} = event.target.elements

        showData({
            username : username.value,
            password : pass.value
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
    const [open, isOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    function clickHandler(event: React.MouseEvent){
        const {innerText : buttonName} = event.target as HTMLElement
        setName(buttonName);
        isOpen(true);
    }
    
    function showData(data : Data){
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