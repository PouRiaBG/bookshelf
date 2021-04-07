import {Dialog} from './lib'
import React from 'react'

export const ModalContext = React.createContext()


function Modal(props){
  const [isOpen, setIsOpen] = React.useState(false);
  const value = [isOpen, setIsOpen];

  return (
    <ModalContext.Provider value={value} {...props}/>
  )
}



function ModalDismissButton({children: child}){
    const [,setIsOpen] = React.useContext(ModalContext);
    return React.cloneElement(
      child,
      {onClick : () => setIsOpen(false)}
    )
}



function ModalOpenButton({children}){
  const [,setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(
    children,
    {
      onClick : () => setIsOpen(true)
    })
}

function ModalContents(props){
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return <Dialog isOpen={isOpen} onDismiss={()=> setIsOpen(false)} {...props} />
}


export {Modal, ModalContents, ModalOpenButton, ModalDismissButton}