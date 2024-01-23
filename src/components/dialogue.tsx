import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="relative inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="font-p rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-black rounded-[30px] overflow-hidden shadow-[2px_2px] border-4 border-black hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Open Interior
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[45vw] h-[70vh] max-w-xlg max-h-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex items-center justify-center shadow-[10px_10px] border-4 border-black">
                  <div>
                    <iframe className="h-screen w-screen"
                      frameBorder="0" 
                      style={{ border: 0 }} 
                      src="https://maker.mappedin.com/map/657cc670040fcba69696e69e/directions?map=Ground&location=🚿%20Showers&departure=Ground+49.262409520738+-123.24466075056152" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
