// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./TodoApp.css";
// import { useAuth } from "../context/AuthContext";

// function TodoApp() {
//   const { authState } = useAuth();
//   const [allTodos, setTodos] = useState([]); // Default value as empty array
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [currentEditId, setCurrentEditId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (authState.isAuthenticated && authState.user) {
//       const token = localStorage.getItem("token");
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.id;
//       if (userId) {
//         fetchTodos(userId);
//       }
//     }
//   }, [authState]);

//   // Fetch all todos
//   const fetchTodos = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTodos(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//       setTodos([]); // Ensure it's an empty array on error
//     }
//   };
 
  
  

//   // Add or update a todo
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTitle.trim() || !newDescription.trim()) {
//       toast.error("Title and description are required");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       // If currentEditId is set, we are updating an existing todo
//       if (currentEditId) {
//         const response = await axios.put(
//           `${import.meta.env.VITE_API_URL}/api/todos/${currentEditId}`,
//           { title: newTitle, description: newDescription },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTodos(
//           allTodos.map((todo) =>
//             todo._id === currentEditId ? response.data : todo
//           )
//         );
//         toast.success("Todo updated successfully");
//       } else {
//         // If currentEditId is not set, we are adding a new todo
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/todos`,
//           { title: newTitle, description: newDescription },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setTodos([...allTodos, response.data]);
//         toast.success("Todo added successfully");
//       }

//       // Reset the form after adding or updating
//       setNewTitle("");
//       setNewDescription("");
//       setCurrentEditId(null);
//     } catch (error) {
//       console.error("Error saving todo:", error);
//       toast.error("Error saving todo");
//     }
//   };

//   // Delete a todo
//   const handleDeleteTodo = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setTodos(allTodos.filter((todo) => todo._id !== id));
//       toast.success("Todo deleted successfully");
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//       toast.error("Error deleting todo");
//     }
//   };

//   // Edit a todo (populate the form with the todo details)
//   const handleEdit = (todo) => {
//     setCurrentEditId(todo._id);
//     setNewTitle(todo.title);
//     setNewDescription(todo.description);
//   };

//   const filteredTodos = allTodos.filter(
//     (todo) =>
//       todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       todo.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="todo-app">
//       <h1>My Todos</h1>
      

//       <div className="todo-wrapper">
//         <div className="todo-input">
//           <div className="todo-input-item">
//             <label>Title</label>
//             <input
//               type="text"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               placeholder="What's the task title?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Description</label>
//             <input
//               type="text"
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="What's the description?"
//             />
//           </div>
//           <button onClick={handleAddOrUpdateTodo} type="button"  className="primaryBtn">
//             {currentEditId ? "Save" : "Add"}
//           </button>

         
//         </div>
//         <div className="todo-search">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search todos..."
//           />
//         </div>
        
//         <div className="todo-list">
//           {filteredTodos.map((todo) => (
//             <div key={todo._id} className="todo-item">
//               <h3>{todo.title}</h3>
//               <p>{todo.description}</p>
//               <button onClick={() => handleEdit(todo)}>
//                 <AiOutlineEdit />
//               </button>
//               <button onClick={() => handleDeleteTodo(todo._id)}>
//                 <AiOutlineDelete />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default TodoApp;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./TodoApp.css";
// import { useAuth } from "../context/AuthContext";

// function TodoApp() {
//   const { authState } = useAuth();
//   const [allTodos, setTodos] = useState([]); // Default value as empty array
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [currentEditId, setCurrentEditId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dateFilter, setDateFilter] = useState("all"); // New state for date filter

//   useEffect(() => {
//     if (authState.isAuthenticated && authState.user) {
//       const token = localStorage.getItem("token");
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken.id;
//       if (userId) {
//         fetchTodos(userId);
//       }
//     }
//   }, [authState, dateFilter]); // Add dateFilter as a dependency

//   // Fetch all todos
//   const fetchTodos = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTodos(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//       setTodos([]); // Ensure it's an empty array on error
//     }
//   };

//   // Add or update a todo
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTitle.trim() || !newDescription.trim()) {
//       toast.error("Title and description are required");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       // If currentEditId is set, we are updating an existing todo
//       if (currentEditId) {
//         const response = await axios.put(
//           `${import.meta.env.VITE_API_URL}/api/todos/${currentEditId}`,
//           { title: newTitle, description: newDescription },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTodos(
//           allTodos.map((todo) =>
//             todo._id === currentEditId ? response.data : todo
//           )
//         );
//         toast.success("Todo updated successfully");
//       } else {
//         // If currentEditId is not set, we are adding a new todo
//         const response = await axios.post(
//           `${import.meta.env.VITE_API_URL}/api/todos`,
//           { title: newTitle, description: newDescription },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setTodos([...allTodos, response.data]);
//         toast.success("Todo added successfully");
//       }

//       // Reset the form after adding or updating
//       setNewTitle("");
//       setNewDescription("");
//       setCurrentEditId(null);
//     } catch (error) {
//       console.error("Error saving todo:", error);
//       toast.error("Error saving todo");
//     }
//   };

//   // Delete a todo
//   const handleDeleteTodo = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setTodos(allTodos.filter((todo) => todo._id !== id));
//       toast.success("Todo deleted successfully");
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//       toast.error("Error deleting todo");
//     }
//   };

//   // Edit a todo (populate the form with the todo details)
//   const handleEdit = (todo) => {
//     setCurrentEditId(todo._id);
//     setNewTitle(todo.title);
//     setNewDescription(todo.description);
//   };

//   // Function to filter todos by date range
//   const filterTodosByDate = (todos) => {
//     const now = new Date();
//     const filtered = todos.filter((todo) => {
//       const todoDate = new Date(todo.updatedAt);
//       const timeDiff = now - todoDate;
//       const daysDiff = timeDiff / (1000 * 3600 * 24);

//       switch (dateFilter) {
//         case "3":
//           return daysDiff <= 3;
//         case "7":
//           return daysDiff <= 7;
//         case "30":
//           return daysDiff <= 30;
//         default:
//           return true;
//       }
//     });
//     return filtered;
//   };

//   const filteredTodos = filterTodosByDate(
//     allTodos.filter(
//       (todo) =>
//         todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         todo.description.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className="todo-app">
//       <h1>My Todos</h1>

//       <div className="todo-wrapper">
//         <div className="todo-input">
//           <div className="todo-input-item">
//             <label>Title</label>
//             <input
//               type="text"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               placeholder="What's the task title?"
//             />
//           </div>
//           <div className="todo-input-item">
//             <label>Description</label>
//             <input
//               type="text"
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="What's the description?"
//             />
//           </div>
//           <button onClick={handleAddOrUpdateTodo} type="button" className="primaryBtn">
//             {currentEditId ? "Save" : "Add"}
//           </button>
//         </div>

//         <div className="todo-search">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search todos..."
//           />
//         </div>

//         <div className="todo-date-filter">
//           <select
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="date-filter-select"
//           >
//             <option value="all">All</option>
//             <option value="3">Last 3 Days</option>
//             <option value="7">Last 7 Days</option>
//             <option value="30">Last 30 Days</option>
//           </select>
//         </div>

//         <div className="todo-list">
//           {filteredTodos.map((todo) => (
//             <div key={todo._id} className="todo-item">
//               <h3>{todo.title}</h3>
//               <p>{todo.description}</p>
//               <button onClick={() => handleEdit(todo)}>
//                 <AiOutlineEdit />
//               </button>
//               <button onClick={() => handleDeleteTodo(todo._id)}>
//                 <AiOutlineDelete />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default TodoApp;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TodoApp.css";
import { useAuth } from "../context/AuthContext";

function TodoApp() {
  const { authState } = useAuth();
  const [allTodos, setTodos] = useState([]); // Default value as empty array
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // New state for date filter

  useEffect(() => {
    if (authState.isAuthenticated && authState.user) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      if (userId) {
        fetchTodos(userId);
      }
    }
  }, [authState, dateFilter]); // Add dateFilter as a dependency

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // Ensure it's an empty array on error
    }
  };

  // Add or update a todo
  const handleAddOrUpdateTodo = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // If currentEditId is set, we are updating an existing todo
      if (currentEditId) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/todos/${currentEditId}`,
          { title: newTitle, description: newDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTodos(
          allTodos.map((todo) =>
            todo._id === currentEditId ? response.data : todo
          )
        );
        toast.success("Todo updated successfully");
      } else {
        // If currentEditId is not set, we are adding a new todo
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/todos`,
          { title: newTitle, description: newDescription },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTodos([...allTodos, response.data]);
        toast.success("Todo added successfully");
      }

      // Reset the form after adding or updating
      setNewTitle("");
      setNewDescription("");
      setCurrentEditId(null);
    } catch (error) {
      console.error("Error saving todo:", error);
      toast.error("Error saving todo");
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos(allTodos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error deleting todo");
    }
  };

  // Edit a todo (populate the form with the todo details)
  const handleEdit = (todo) => {
    setCurrentEditId(todo._id);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
  };

  // Function to filter todos by date range
  const filterTodosByDate = (todos) => {
    const now = new Date();
    const filtered = todos.filter((todo) => {
      const todoDate = new Date(todo.updatedAt);
      const timeDiff = now - todoDate;
      const daysDiff = timeDiff / (1000 * 3600 * 24);

      switch (dateFilter) {
        case "3":
          return daysDiff <= 3;
        case "7":
          return daysDiff <= 7;
        case "30":
          return daysDiff <= 30;
        default:
          return true;
      }
    });
    return filtered;
  };

  const filteredTodos = filterTodosByDate(
    allTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="todo-app">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description?"
            />
          </div>
          <button onClick={handleAddOrUpdateTodo} type="button" className="primaryBtn">
            {currentEditId ? "Save" : "Add"}
          </button>
        </div>

        <div className="todo-search">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search todos..."
          />
        </div>

        <div className="todo-date-filter">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {dateFilter === "all"
                ? "All"
                : dateFilter === "3"
                ? "Last 3 Days"
                : dateFilter === "7"
                ? "Last 7 Days"
                : "Last 30 Days"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setDateFilter("3")}
                >
                  Last 3 Days
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setDateFilter("7")}
                >
                  Last 7 Days
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setDateFilter("30")}
                >
                  Last 30 Days
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setDateFilter("all")}
                >
                  All
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div key={todo._id} className="todo-item">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <button onClick={() => handleEdit(todo)}>
                <AiOutlineEdit />
              </button>
              <button onClick={() => handleDeleteTodo(todo._id)}>
                <AiOutlineDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default TodoApp;
