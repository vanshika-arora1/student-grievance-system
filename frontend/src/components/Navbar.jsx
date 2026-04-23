export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      <h3>Grievance System</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}