import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import phoneCode from "../../../../data/contryCode.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactDropDown({ onCountrySelected }) {
  const [selectedCountry, setSelectedCountry] = useState(
    phoneCode.find((country) => country.name === "Madagascar")
  );

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    /*navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude.toFixed(2);
      var longitude = position.coords.longitude.toFixed(2);
      console.log("Votre localisation actuelle: Latitude: " + latitude + ", Longitude: " + longitude);
    });*/
    onCountrySelected(selectedCountry);
  }, []);

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img className="w-5 h-5 " src={selectedCountry.image} alt="flag" />(
          {selectedCountry.dial_code})
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
            {phoneCode.map((country) => (
              <Menu.Item key={country.name}>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm w-full"
                    )}
                    onClick={() => handleSelectCountry(country)}
                  >
                    <img
                      className="w-5 h-5 mr-2"
                      src={country.image}
                      alt="flag"
                    />
                    {country.name} ({country.dial_code})
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
