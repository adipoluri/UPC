'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUser } from '@auth0/nextjs-auth0/client'
import Dialogue from './dialogue'
import Logo from './logo'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  return (
    <div className="relative flex-row-reverse h-16 items-center justify-between">
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 static inset-auto mx-6 pr-0 pt-4">
        {/* Profile dropdown */}
        {!user&&!isLoading?                
          <div className="font-j absolute right-0 z-10 w-48 origin-top-right rounded-[30px] bg-white py-1 shadow-[4px_4px] border-4 border-black">
            <a
              href="/api/auth/login"
              className='block px-4 py-2 text-sm text-gray-700 '
            >
              Login
            </a>
          </div>:<></>
        }
        <Logo/>
        <span className='font-d tracking-tight text-5xl medium-bold pr-6'>Universal Privy Compass</span>
        {user?
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-[30px] overflow-hidden shadow-[4px_4px] border-4 border-black">
              <span className="absolute -inset-1.5"/>
              <span className="sr-only">Open user menu</span>
              {user?
                <img
                  className="h-12 w-12 rounded-full"
                  src={user?.picture?user.picture:""}
                  alt={""}
                />
              :
                <></>
              }
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="font-j absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-[30px] bg-white py-1 shadow-[5px_5px] border-4 border-black">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/api/auth/logout"
                    className='block px-4 py-2 text-sm text-gray-700 '
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        :<></>}
      </div>
    </div>
  )
}