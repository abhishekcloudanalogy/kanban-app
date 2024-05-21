import {
  closeAddAndEditBoardModal,
  getAddAndEditBoardModalValue,
  getAddAndEditBoardModalVariantValue,
  getCurrentBoardName,
} from "../../redux/features/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Modal, ModalBody } from "./Modal";
import { FaTimes } from "react-icons/fa";
import { id } from "../utils/data";
import { useEffect, useState } from "react";
import { useUpdateBoardToDbMutation, useFetchDataFromDbQuery } from "../../redux/services/apiSlice";
// define types for boarddata
interface IBoardData {
  id: string;
  name: string;
  columns: {
    id: string;
    name: string;
    columns?: { name: string; tasks?: { [key: string]: any }[] };
  }[];
}
// dummy add board data for the "Add board" modal
let addBoardData = {
  id: id(),
  name: "",
  columns: [
    {
      id: id(),
      name: "",
      tasks: [],
    },
  ],
};

export default function AddAndEditBoardModal() {
  const [boardData, setBoardData] = useState<IBoardData>();
  const [isBoardNameEdit, setIsBoardNameEmpty] = useState<boolean>(false);
  const [emptyColumnIndex, setEmptyColumnIndex] = useState<number>();
  const modalVariant = useAppSelector(getAddAndEditBoardModalVariantValue);
  const closeMoadl = () => dispatch(closeAddAndEditBoardModal());
  const isVariantAdd = modalVariant === "Add New Board";

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(getAddAndEditBoardModalValue);
  const currentBoardName = useAppSelector(getCurrentBoardName);

  let { data } = useFetchDataFromDbQuery();
  const [updateBoardToDb, { isLoading }] = useUpdateBoardToDbMutation();

  useEffect(() => {
    if (data) {
      if (isVariantAdd) {
        setBoardData(addBoardData);
      } else {
        const activeBoard = data[0].boards.find(
          (board: { name: string }) => board.name === currentBoardName
        );
        setBoardData(activeBoard);
      }
    }
  }, [currentBoardName, data, isVariantAdd]);

  useEffect(() => {
    const tiemoutId = setTimeout(() => {
      setIsBoardNameEmpty(false);
      setEmptyColumnIndex(undefined);
    }, 3000);
    return () => {
      clearTimeout(tiemoutId);
    };
  }, [emptyColumnIndex, emptyColumnIndex]);

  // Handler for board name change
  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (boardData) {
      const newName = { ...boardData, name: e.target.value };
      setBoardData(newName);
    }
  };

  // Handler for column name change. These kind of functions are called closures

  const handleColumnNameChange = (index: number) => {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      // handle change for create new board modal
      if (boardData) {
        const modifyColumns = boardData.columns.map((column, columnIndex) => {
          if (columnIndex === index) {
            return { ...column, name: e.target.value };
          }
          return column;
        });
        const modifiedColumn = { ...boardData, columns: modifyColumns };
        setBoardData(modifiedColumn);
      }
    };
  };

  // Handler for adding a new column to the form
  const handleAddNewColumn = () => {
    // max columns we want to have in a board is 7
    if (boardData && boardData.columns.length < 6) {
      // Make a copy of the existing boardData
      const updatedBoardData = { ...boardData };
      // Create a new column object
      const newColumn = { id: id(), name: "", tasks: [] };
      // Push the new column to the columns array in the copy
      updatedBoardData.columns = [...updatedBoardData.columns, newColumn];
      // Update the state with the modified copy
      setBoardData(updatedBoardData);
    }
  };

  // Handler for deleting a column in the form
  const handleDeleteColumn = (index: number) => {
    if (boardData) {
      const filteredColumns = boardData.columns.filter(
        (_column, columnIndex) => columnIndex !== index
      );
      setBoardData({ ...boardData, columns: filteredColumns });
    }
  };

  // Handler for adding a new board to the database
  const handleAddNewBoardToDb = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // check if any of the column names are empty before submiting
    const emptyColumnStringChecker = boardData?.columns.some((column) => column.name === "");

    //condition to run if the board name is empty
    if (boardData?.name === "") {
      setIsBoardNameEmpty(true);
    }

    //if any of the column names is empty, update the emptyColumnIndex with its index
    if (emptyColumnStringChecker) {
      const emptyColumn = boardData?.columns.findIndex((column) => column.name == "");
      setEmptyColumnIndex(emptyColumn);
    }

    if (boardData?.name !== "" && !emptyColumnStringChecker) {
      //submit to the database after verifying that the board name and none of the column names aren't empty
      if (data) {
        let [boards] = data;
        const addBoard = [...boards.boards, boardData];
        boards = addBoard;
        updateBoardToDb(boards);
      }
    }
  };

  // Handler for editing a board in the database
  const handleEditBoardToDb = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emptyColumnStringChecker = boardData?.columns.some((column) => column.name === "");
    //condition to run if the board name is empty
    if (boardData?.name === "") {
      setIsBoardNameEmpty(true);
    }
    //if any of the column names is empty, update the emptyColumnIndex with its index
    if (emptyColumnStringChecker) {
      const emptyColumn = boardData?.columns.findIndex((column) => column.name == "");
      setEmptyColumnIndex(emptyColumn);
    }
    //submit to the database after verifying that the board name and none of the column names aren't empty
    if (boardData?.name !== "" && !emptyColumnStringChecker) {
      if (data) {
        const [boards] = data;
        const boardsCopy = [...boards.boards];
        const activeBoardIndex = boardsCopy.findIndex(
          (board: { name: string }) => board.name === currentBoardTitle
        );
        const updatedBoard = {
          ...boards.boards[activeBoardIndex],
          name: boardData!.name,
          columns: boardData!.columns,
        };
        boardsCopy[activeBoardIndex] = updatedBoard;
        updateBoardToDb(boardsCopy);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeMoadl}>
      <ModalBody>
        <p>{modalVariant}</p>
      </ModalBody>
    </Modal>
  );
}
