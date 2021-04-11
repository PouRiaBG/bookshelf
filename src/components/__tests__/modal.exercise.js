import {Modal ,ModalContents , ModalOpenButton} from '../modal';
import * as React from 'react'
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('can be opened and closed', ()=>{

    const label = 'Label'
    const title = 'Title'
    const content = 'content'
    render(
        <Modal>
        <ModalOpenButton>
          <button>Open</button>
        </ModalOpenButton>
        <ModalContents aria-label={label} title={title}>
          <div>{content}</div>
        </ModalContents>
      </Modal>,
    )
    const button = screen.getByRole('button', {name : /open/i})
    userEvent.click(button)
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', label)
    const inModal = within(modal)

    expect(inModal.getByRole('heading', {name: title})).toBeInTheDocument()
    
    expect(inModal.getByText(content)).toBeInTheDocument()
    userEvent.click(inModal.getByRole('button', {name: /close/i}))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})