import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import phoneCode from "../../../../data/contryCode.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactDropDown() {
  const [state, setState] = useState(phoneCode[0].name);
  const [dial_code, setDial_code] = useState(phoneCode[0].dial_code);
  const [flag, setFlag] = useState(phoneCode[0].image);
  const [code, setCode] = useState(phoneCode[0].code);

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img className="w-5 h-5 " src={flag} alt="flag" />({dial_code})
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 max-h-56 overflow-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {phoneCode.map((phoneCode, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm w-full"
                    )}
                  >
                    <img
                      className="w-5 h-5 mr-2"
                      src={phoneCode.image}
                      alt="flag"
                    />
                    {phoneCode.name} ({phoneCode.dial_code})
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
