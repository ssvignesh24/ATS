/** @format */

import React, { Fragment, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";
import { Menu, Transition } from "@headlessui/react";

import CurrentUserContext from "./contexts/current_user";

import { classNames, CsrfToken } from "./lib/misc";

import DefaultDp from "images/default_dp.jpg";

const isActive = ({ isCurrent, isPartiallyCurrent }) => {
  let class_name = "px-4 h-full text-base border-b-4 d-block flex justify-center items-center ";
  class_name += isCurrent || isPartiallyCurrent ? "border-primary-500 font-medium" : "border-transparent";
  return { className: class_name };
};

export default function () {
  const currentUser = useContext(CurrentUserContext);
  const isDark = false;

  const activeClass = (active) => {
    const klass = isDark ? "bg-black bg-opacity-20  " : "bg-gray-100";
    return classNames(
      isDark ? "text-white" : "text-black",
      active ? klass : "",
      "block w-full text-left px-4 py-2 text-sm"
    );
  };

  return (
    <div className="w-full shadow-md text-white flex fixed z-30" style={{ height: "55px", backgroundColor: "#3B404A" }}>
      <div className="w-8/12 h-full flex">
        <Link to="/dashboard" getProps={isActive}>
          Dashboard
        </Link>
        <Link to="/jobs" getProps={isActive}>
          Jobs
        </Link>
        <Link to="/candidates" getProps={isActive}>
          Candidate Pool
        </Link>
      </div>
      <div className="w-4/12 h-full flex flex-row-reverse">
        <div style={{ width: "60px", height: "60px" }} className="p-3">
          <Menu as="div" className="relative text-left w-full h-full">
            {({ open }) => (
              <>
                <Menu.Button
                  className="user-menu dropdown cursor-pointer focus:outline-none overflow-hidden w-full h-full rounded-full "
                  click="isOpen = !isOpen">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={currentUser.dpUrl || DefaultDp} className="w-full h-min-full" />
                  </div>
                </Menu.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                    static
                    className={
                      "mr-3 origin-top-right absolute right-0 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " +
                      (isDark ? "bg-dark text-light " : "bg-white")
                    }>
                    <div className="py-1">
                      <Link to="/profile">
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={() => setShowProfile(true)} className={activeClass(active)}>
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                      </Link>
                      {currentUser.isAdmin && (
                        <Link to="/admin">
                          <Menu.Item>
                            {({ active }) => (
                              <button onClick={() => {}} className={activeClass(active)}>
                                Admin settings
                              </button>
                            )}
                          </Menu.Item>
                        </Link>
                      )}

                      <hr className="my-2" />
                      <form method="POST" action="/users/sign_out">
                        <input type="hidden" name="_method" value="DELETE" />
                        <input type="hidden" name="authenticity_token" value={CsrfToken} />
                        <Menu.Item>
                          {({ active }) => (
                            <button type="submit" className={activeClass(active)}>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}
