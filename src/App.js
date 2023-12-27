import { createBrowserRouter } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Body from "./components/Body";
import ChatPage from "./components/ChatPage";
function App() {
  return <div></div>;
}

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default App;
