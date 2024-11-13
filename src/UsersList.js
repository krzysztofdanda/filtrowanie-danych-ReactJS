import { useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    userType: 'Admin'
  });

  // Pełna lista użytkowników oraz lista filtrowana
  const [allUsers, setAllUsers] = useState([]); // Zawiera wszystkich użytkowników
  const [filteredUsers, setFilteredUsers] = useState([]); // Zawiera przefiltrowanych użytkowników

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: target.value };
    });
  };

  // Dodawanie nowego użytkownika do listy
  const setUser = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: Date.now() };
    const updatedUsers = allUsers.concat(newUser);
    setAllUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Odświeżamy również listę filtrowaną
  };

  // Usuwanie użytkownika
  const removeUser = (id) => {
    const updatedUsers = allUsers.filter(user => user.id !== id);
    setAllUsers(updatedUsers);
    setFilteredUsers(updatedUsers); // Aktualizujemy również listę filtrowaną
  };

  // Funkcja do filtrowania użytkowników na podstawie typu
  const filterUsers = (type) => {
    if (type === 'all') {
      setFilteredUsers(allUsers); // Wyświetl wszystkich użytkowników
    } else {
      setFilteredUsers(allUsers.filter((user) => user.userType === type));
    }
  };

  return (
    <div className="usersList">
      <h1>Lista użytkowników</h1>

      {/* Formularz dodawania nowego użytkownika */}
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="userType">User type</label>
        <select id="userType" name="userType" onChange={handleInputChange} value={formData.userType}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button type="submit">Save</button>
      </form>

      {/* Przyciski do filtrowania */}
      <div>
        <button onClick={() => filterUsers('Admin')}>Wyświetl tylko adminów</button>
        <button onClick={() => filterUsers('User')}>Wyświetl tylko userów</button>
        <button onClick={() => filterUsers('all')}>Wyświetl wszystkich</button>
      </div>

      {/* Wyświetlanie listy użytkowników */}
      <div className="list">
        {filteredUsers.map((user) => (
          <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.userType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
