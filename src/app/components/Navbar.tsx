"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useFetchDataFromDbQuery } from "../../redux/services/apiSlice";
import {
  getCurrentBoardName,
  openAddAndEditBoardModal,
  setCurrentBoardName,
} from "../../redux/features/appSlice";

export default function Navbar({ session }) {
  const [show, setShow] = useState<boolean>(false);
  const { data } = useFetchDataFromDbQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      const activeBoard = data[0].boards[0];
      dispatch(setCurrentBoardName(activeBoard.name));
    }
  }, [data, dispatch]);

  const currentBoardName = useAppSelector(getCurrentBoardName);
  return (
    <nav className="bg-white border flex h-24">
      <div className="flex-none w-[18.75rem] border-r-2 flex items-center pl-[2.12rem]">
        <p className="font-bold text-3xl"> Kanban App </p>
      </div>

      <div className="flex justify-between w-full items-center pr-[2.12rem]">
        <p className="text-black text-2xl font-bold pl-6">{currentBoardName}</p>

        <div className="flex items-center space-x-3">
          <button
            className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center space-x-2"
            onClick={() => dispatch(openAddAndEditBoardModal("Edit Board"))}
          >
            <p>+ Add New Task</p>
          </button>
          <div className="flex items-center gap-3">
            {session ? (
              <button
                className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center "
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-blue-500 text-black px-4 py-2 flex rounded-3xl items-center "
                onClick={() => {
                  signIn();
                }}
              >
                Login
              </button>
            )}
            <button className="text-3xl mb-4" onClick={() => setShow(!show)}>
              ...
            </button>
            <Dropdown show={show} />
          </div>
        </div>
      </div>
    </nav>
  );
}
