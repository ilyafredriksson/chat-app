import { useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      position:"fixed", left:0, top:0, width:"200px",
      height:"100%", background:"lightgray", padding:"10px"
    }}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default SideNav;
