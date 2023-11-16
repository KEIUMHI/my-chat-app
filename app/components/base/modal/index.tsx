'use client'
// import classNameNames from 'classNamenames'
import type { FC, ReactNode } from 'react'
import React from 'react'
import ReactModalComp from 'react-modal'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './style.css'
export type ModalProps = ReactModal.Props & {
  title?: string
  footer?: (() => ReactNode) | null
  close?: () => void
}

let _idIndex = 0
const IDPREFIX = 'chat-modal_'

const Modal: FC<ModalProps> = ({
  isOpen = false,
  ...rest
}) => {
  const id = IDPREFIX + _idIndex++
  const overlayElement: ReactModal.Props['overlayElement'] = (props, contentElement) => {
    return (
      <dialog id={id} className={`modal ${isOpen ? 'opacity-100' : ''}`} style={isOpen ? { pointerEvents: 'inherit' } : {}}>{contentElement}</dialog>
    )
  }

  const contentElement: ReactModal.Props['contentElement'] = (props, children) => {
    return (
      <div className="modal-box">
        <h3 className="font-bold text-lg">{rest.title || 'Hello!'}</h3>
        {children}
        {typeof rest.footer === 'function'
          ? rest.footer()
          : rest.footer === undefined
            ? (
              <div className="modal-action">
                <button className="btn" onClick={rest.close}>关闭</button>
              </div>
            )
            : <></>
        }
      </div>
    )
  }
  return (
    <TransitionGroup>
      {isOpen && (
        <CSSTransition timeout={200} classNames="modal-wrap">
          <ReactModalComp
            isOpen={isOpen}
            overlayClassName="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full "
            className="relative p-4 w-full max-w-2xl max-h-full"
            overlayElement={overlayElement}
            contentElement={contentElement}
            {...rest}
          ></ReactModalComp>
        </CSSTransition>
      )
      }
    </TransitionGroup >
  )
}

export default Modal
