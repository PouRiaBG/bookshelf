import {Dialog} from './lib'
/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {CircleButton} from './lib'
import VisuallyHidden from '@reach/visually-hidden'


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
      {
        onClick : () => {
          setIsOpen(false)
          if(child.props.onClick){
            child.props.onClick()
        }}
      })
}
 

function ModalOpenButton({children: child}){
  const [,setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(
    child,
    {
      onClick : () => {
        setIsOpen(true)
        if(child.props.onClick){
          child.props.onClick()
        }
      } 
    })
}




function ModalContentsBase(props){
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return <Dialog isOpen={isOpen} onDismiss={()=> setIsOpen(false)} {...props} />
}



function ModalContents({children, title, ...props}){
  return (
    <ModalContentsBase {...props}>
        <div css={{display: 'flex', justifyContent: 'flex-end'}}>
              <ModalDismissButton>
                <CircleButton >
                  <VisuallyHidden>Close</VisuallyHidden>
                  <span aria-hidden>×</span>
                </CircleButton>
              </ModalDismissButton>
        </div>
        <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>
        {children}
    </ModalContentsBase>
  )
}

export {Modal, ModalContents, ModalOpenButton, ModalDismissButton}