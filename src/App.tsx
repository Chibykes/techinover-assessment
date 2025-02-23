import "./App.css";
import AppContext from "./contexts/app";
import Homepage from "./pages/Homepage";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <AppContext>
      <Homepage />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </AppContext>
  );
}

export default App;
