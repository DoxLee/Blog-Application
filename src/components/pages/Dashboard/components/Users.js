import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { svg } from "./misc/svg";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:3000/admin/users", {
        limit: 12,
      });
      setUsers(response.data);
    } catch (error) {
      alert(error);
    }
  };
  console.log(users, "users");

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <table className="w-full text-gray-700 table-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="text-lg text-gray-700 ">
          {users.map((item, _idx) => (
            <tr>
              <td className="text-center">{_idx + 1}</td>
              <td>{item.email}</td>
              <td>{item.userName}</td>
              <td>{item.role}</td>
              <td>{moment(item.createdAt).fromNow()}</td>
              <td className="flex items-center justify-center transition cursor-pointer hover:text-blue-600">
                <Link to={`/edit/${item._id}`}>{svg.edit}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
