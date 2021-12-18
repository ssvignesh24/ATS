/** @format */

import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { XIcon } from "@heroicons/react/solid";

import OutsideClickListener from "../OutsideClickListener";
import { ThemeContext, themes } from "../../contexts/theme";
import UserLine from "../UserLine";

import UserClient from "../../services/users";

const UserSelect = function ({ onChange, multi, excludeUserIds, defaultSelectedUser, defaultSelectedUsers }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme == themes.dark;
  const userClient = new UserClient();
  const searchField = useRef();

  let initialValue = null;

  if (multi)
    if (defaultSelectedUsers) initialValue = defaultSelectedUsers;
    else initialValue = [];
  else if (defaultSelectedUser) initialValue = defaultSelectedUser;

  const [selectedUser, setSelectedUser] = useState(initialValue);
  const [users, setUsers] = useState();
  const [state, setState] = useState("waiting");
  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => () => userClient.cancel(), []);

  useEffect(() => {
    if (!multi && !selectedUser?.id) {
      onChange(null);
      return;
    }
    onChange(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    if (!query) {
      setShowOptions(false);
      return;
    }
    setState("loading");
    const options = {};
    if (multi) options.excude_user_ids = selectedUser.map((u) => u.id);
    userClient.search(query, options).then(({ data }) => {
      if (!data) {
        setState("error");
        return;
      }
      setUsers(data.users);
      setState("loaded");
    });
    setShowOptions(true);
  }, [query]);

  const chooseUser = (user) => {
    setShowOptions(false);
    setQuery("");
    if (multi) {
      if (selectedUser && selectedUser.find((u) => u.id == user.id)) return;
      setSelectedUser((u) => u.concat(user));
      setTimeout(() => searchField.current.focus(), 0);
    } else setSelectedUser(user);
  };

  const removeSelectedUser = (event, user) => {
    event.stopPropagation();
    if (!multi) return;
    setSelectedUser((_users) => _users.filter((u) => u.id != user.id));
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <OutsideClickListener onClick={closeOptions}>
      <div className="relative w-full">
        <div
          className={
            "relative w-full  border pl-3 pr-12 border-gray-200 bg-transparent rounded w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer " +
            (!multi && " h-10 py-1.5 ") +
            (multi && " pt-2")
          }
          style={{ minHeight: multi ? "2.5rem" : "auto" }}>
          {multi && (
            <div className="flex flex-wrap">
              {selectedUser &&
                selectedUser.length > 0 &&
                selectedUser
                  .filter((u) => u.id)
                  .map((u) => {
                    return (
                      <div
                        key={u.id}
                        className="flex items-center mr-2 mb-2 rounded text-sm bg-green-500 bg-opacity-20 px-3 py-2">
                        <UserLine user={u} size="sm"></UserLine>
                        <div
                          className="flex justify-center items-center h-full right-0 top: 0 pl-2.5"
                          onMouseUp={(e) => removeSelectedUser(e, u)}>
                          <XIcon className={"s-3 h-3 " + (isDark ? "text-gray-300" : "text-gray-700")}></XIcon>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
          {!multi && selectedUser && <UserLine user={selectedUser} size="sm"></UserLine>}
          {!multi && selectedUser && (
            <div
              className="absolute flex items-center justify-center h-10 w-10 right-0 top-0 "
              onClick={() => {
                setSelectedUser(null);
                setTimeout(() => searchField.current.focus(), 0);
              }}>
              <XIcon className="w-5 h-5 text-gray-500"></XIcon>
            </div>
          )}
          {((!multi && !selectedUser) || multi) && (
            <input
              className={
                "w-full h-8 mb-2 border-0 focus:ring-transparent focus:outline-none bg-transparent " +
                (isDark ? "placeholder-gray-300 text-light" : "text-black")
              }
              placeholder="Search users"
              ref={searchField}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </div>
        {showOptions && (
          <div
            className={
              "w-full absolute max-h-48 shadow rounded left-0 text-sm overflow-x-hidden overflow-y-auto " +
              (isDark ? "bg-dark-1 text-light" : "bg-white text-gray-900")
            }
            style={{ top: "102%" }}>
            <ul>
              {state == "loaded" && users && (
                <>
                  {users.length > 0 &&
                    users.map((user) => {
                      return (
                        <li
                          key={user.id}
                          onClick={() => chooseUser(user)}
                          className={
                            "w-full h-12 px-3 py-1.5  cursor-pointer  transition-colors " +
                            (isDark ? "hover:bg-black hover:bg-opacity-20" : "hover:bg-gray-100")
                          }>
                          <UserLine user={user}></UserLine>
                        </li>
                      );
                    })}
                  {users.length <= 0 && (
                    <li
                      className={
                        "w-full h-12 px-3 flex items-center py-1.5  cursor-pointer  transition-colors " +
                        (isDark ? "hover:bg-black hover:bg-opacity-20" : "hover:bg-gray-100")
                      }>
                      No users found
                    </li>
                  )}
                </>
              )}
              {state == "loading" && (
                <li
                  className={
                    "w-full h-12 px-3 flex items-center  cursor-pointer  transition-colors " +
                    (isDark ? "hover:bg-black hover:bg-opacity-20" : "hover:bg-gray-100")
                  }>
                  Searching users...
                </li>
              )}
              {state == "error" && (
                <li
                  className={
                    "w-full h-12 px-3 flex items-center  cursor-pointer  transition-colors " +
                    (isDark ? "hover:bg-black hover:bg-opacity-20" : "hover:bg-gray-100")
                  }>
                  Error while searchig user. Please try again
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </OutsideClickListener>
  );
};

UserSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  multi: PropTypes.bool,
  excludeUserIds: PropTypes.array,
  conceal: PropTypes.bool,
  defaultSelectedUser: PropTypes.object,
  defaultSelectedUsers: PropTypes.array,
};

UserSelect.defaultProps = {
  multi: false,
  excludeUserIds: [],
  conceal: false,
};

export default UserSelect;
