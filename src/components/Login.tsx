import { useEffect, useRef } from "react";
import BackEndApisServiceInstance from "../Api/ServerApis";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { getUserContext } from "../UserContext";
import { useAlert } from "../Context/AlertContext";
// import useAlert from "../hooks/useAlert";


const Login = () => {

  const loginInfo = useRef({
    email: '',
    password: '',
  });
  const { user, setUser } = getUserContext();
  const navigate = useNavigate();

  const { showAlert } = useAlert()

  useEffect(() => {
    if (user)
      navigate('/');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginInfo.current.email || !loginInfo.current.password) return;

    try {
      const result: { user: User, jwt: string } = await BackEndApisServiceInstance
        .loginUser(loginInfo.current);
      if (result) {
        localStorage.setItem("jwt", result.jwt);
        setUser(result.user);
        window.location.href = '/'
      }
    } catch (error) {
      showAlert({
        message: error.message,
        type: 'danger',
        title: "Login Failed!",
        cancelText:'Close'
      })
      console.error(error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Panel</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              onChange={(e) => loginInfo.current.email = e.target.value}
              placeholder="email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => loginInfo.current.password = e.target.value}

              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="******************"
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-main focus:border-main sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-main hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
