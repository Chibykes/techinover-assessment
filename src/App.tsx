import AppContextProvider from "./contexts/AppContext";
import Homepage from "./pages/Homepage";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
}

export default App;
