import "./App.css";

// THEME
import { createTheme, ThemeProvider } from "@mui/material/styles";

// COMPONENTS
import TodoList from "./components/TodoList";

// CONTEXTS
import { TodosProvider } from "./contexts/TodosContext";
import { ToastProvider } from "./contexts/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: ["myFont"],
  },
  palette: {
    primary: {
      main: "#9c27b0",
    },
  },
});

// const initialTodos = [
//   {
//     id: uuidv4(),
//     title: "اول واحد",
//     disc: "اول دسكربشن",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "ثاني واحد",
//     disc: "ثاني دسكربشن",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "ثالث واحد",
//     disc: "ثالث دسكربشن",
//     isCompleted: false,
//   },
// ];

function App() {
  // const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <TodosProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              backgroundColor: "#191b1f",
              direction: "rtl",
              paddingTop: "30px",
              paddingBottom: "30px",
              boxSizing: "border-box",
            }}
          >
            <TodoList />
          </div>
        </TodosProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
