//  UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// OTHERS
import { useTodos } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";
// import { TodosContext } from "../contexts/TodosContext";

export default function Todo({ todo, showDelete, showEdit }) {
  // EVENT HANDLERS

  const { dispatch } = useTodos();

  // const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "checked", payload: todo });
    showHideToast("تم التعديل بنجاح");
  }

  const handleEditDialogClickOpen = () => {
    showEdit(todo);
  };

  const handleDeleteDialogClickOpen = () => {
    showDelete(todo);
  };

  // === EVENT HANDLERS ===

  return (
    <>
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          background: todo.isCompleted ? "#4caf50" : "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* TODO TITLE */}
            <Grid size={{ xs: 12, sm: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: { xs: "center", sm: "right" },
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ textAlign: { xs: "center", sm: "right" } }}
              >
                {todo.desc}
              </Typography>
            </Grid>
            {/* == TODO TITLE == */}

            {/* ACTION BUTTONS */}
            <Grid
              size={{ xs: 12, sm: 4 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* CHECK BUTTON */}
              <IconButton
                className="action-button"
                onClick={handleCheckClick}
                aria-label="check"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* == CHECK BUTTON == */}

              <IconButton
                onClick={handleEditDialogClickOpen}
                className="action-button"
                aria-label="edit"
                style={{
                  color: "#4a5cc3",
                  backgroundColor: "white",
                  border: "solid #4a5cc3 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="action-button"
                aria-label="delete"
                style={{
                  color: "#eb3f3f",
                  backgroundColor: "white",
                  border: "solid #eb3f3f 3px",
                }}
                onClick={handleDeleteDialogClickOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
            {/* == ACTION BUTTONS == */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
