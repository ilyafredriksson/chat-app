import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Welcome to Chat App</h1>
      <p><Link to="/register">Register</Link> | <Link to="/login">Login</Link></p>
    </div>
  );
}

export default App;
