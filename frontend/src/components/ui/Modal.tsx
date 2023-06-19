import { ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null
  console.log(isOpen)
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-[100]">
      <div
        className="fixed top-1/2 left-1/2 bg-white p-12 z-[100]"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
