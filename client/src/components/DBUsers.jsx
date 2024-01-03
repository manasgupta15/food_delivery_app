import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import DataTable from "./DataTable";
import { Avatar } from "@mui/material";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch data if allUsers is undefined or null
    if (!allUsers) {
      console.log("fetching data");
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [allUsers, dispatch]); // Add allUsers to the dependency array
  console.log(allUsers);
  return (
    <div className="flex items-center justify-center gap-4 pt-6 w-full">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL || "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1703172786~exp=1703173386~hmac=d1131f03cb91d78cc38712819e117c15d5af8773a4d5ab32fc98c355bd5bbc7b"}
                className="w-32 h-16 object-contain rounded-md"
                alt="User Avatar"
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md  ${
                  rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={allUsers || []} // Ensure that data is an array (fallback to empty array)
        title="List of Users"
      />
    </div>
  );
};

export default DBUsers;
