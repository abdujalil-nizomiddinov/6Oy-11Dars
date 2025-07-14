import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) return alert("Barcha maydonlarni to‘ldiring!");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some((u) => u.username === username);
    if (exists) return alert("Bu username allaqachon mavjud!");

    const updatedUsers = [...users, { username, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    onSignup();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-3 py-2 border-2 rounded border-[lime] outline-none focus:border-green-500 placeholder:text-green-500 text-green-500"
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative mb-3">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-2 border-2 rounded border-[lime] outline-none focus:border-green-500 placeholder:text-green-500 text-green-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={handleSignup}
        >
          Ro‘yxatdan o‘tish
        </button>

        <p className="mt-4 text-sm text-center">
          Hisob bor?{" "}
          <a href="/login" className="text-green-500 hover:text-green-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
