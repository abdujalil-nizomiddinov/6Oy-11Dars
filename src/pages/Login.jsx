import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ onLogin }) => {
  alert(
    "Nima uchundir Sigup ishlamayabdi !!! mommo menda emas kampiyuterimda ishladi lekin verselda yo'q."
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const defaultUser = { username: "egoo_booy", password: "Salom_1234" };
    const allUsers = [...users, defaultUser];

    const userFound = allUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      sessionStorage.setItem("loggedIn", "true");
      onLogin();
      navigate("/");
    } else {
      alert("Login yoki parol xato!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 border-2 rounded border-blue-600 outline-none focus:border-blue-800 text-blue-500 placeholder:text-blue-600"
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-2 border-2 rounded border-blue-600 outline-none focus:border-blue-800 text-blue-500 placeholder:text-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-600"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Hisob yo‘qmi?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Ro‘yxatdan o‘tish
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
