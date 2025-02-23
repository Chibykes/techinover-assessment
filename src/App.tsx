import "./App.css";
import AppContext from "./contexts/app";
import Homepage from "./pages/Homepage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <AppContext>
        <Homepage />
      </AppContext>
    </>
  );
}

export default App;
