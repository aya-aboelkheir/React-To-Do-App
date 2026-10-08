import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import TodoList from "../src/components/TodoList";
import { ToastProvider } from "./contexts/ToastContext";
import TodosProvider from "./contexts/todosContext"
const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  // palette: {
  //   primary: {
  //     main: "#1b5e20",
  //   },
  // },
});

// const initialtodos = [
//   {
//     id: uuidv4(),
//     title: "قؤاءة كتاب 1",
//     details: "ghhhhhhhhhh",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قؤاءة كتاب 2",
//     details: "ghhhhhhhhhh",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "قؤاءة كتاب 3",
//     details: "ghhhhhhhhhh",
//     isCompleted: false,
//   },
// ];

function App() {
  // const [todos, setTodos] = useState(initialtodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
      <ToastProvider>
        <div
          dir="rtl"
          className="flex justify-center items-center min-h-dvh bg-mist-900"
        >
            <TodoList />
        </div>
      </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
