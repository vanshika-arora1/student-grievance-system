import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await API.get("/grievances");
    setGrievances(res.data);
  };

  const submitGrievance = async () => {
    await API.post("/grievances", form);
    fetchData();
  };

  const deleteGrievance = async (id) => {
    await API.delete(`/grievances/${id}`);
    fetchData();
  };

  const searchGrievance = async () => {
    const res = await API.get(`/grievances/search/${search}`);
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <h2>Dashboard</h2>

      {/* Add grievance */}
      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} />
      <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />

      <select onChange={e => setForm({...form, category: e.target.value})}>
        <option>Academic</option>
        <option>Hostel</option>
        <option>Transport</option>
        <option>Other</option>
      </select>

      <button onClick={submitGrievance}>Submit</button>

      {/* Search */}
      <input placeholder="Search" onChange={e => setSearch(e.target.value)} />
      <button onClick={searchGrievance}>Search</button>

      {/* Display */}
      {grievances.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
          <p>{g.category}</p>
          <p>{g.status}</p>

          <button onClick={() => deleteGrievance(g._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}