//  UI
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

//  MODALS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//COMPONENTS
import Todo from "./Todo";

// OTHERS
import { useState, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function TodoList() {
  // const { todos, setTodos } = useContext(TodosContext);

  const {todos, dispatch} = useTodos()
  const { showHideToast } = useToast();

  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [titleInp, setTitleInt] = useState("");
  const [dialogTodo, setDialogTodo] = useState("");
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // FILTRATION ARRAYS

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "nonCompleted") {
    todosToBeRendered = notCompletedTodos;
  }

  // === FILTRATION ARRAYS ===

  // EVENT HANDLERS

  function handleDisplayTodosType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleAddClick() {
    dispatch({
      type: "added",
      payload: {
        title: titleInp,
      },
    });
    setTitleInt("");
    showHideToast("تمت الاضافة بنجاح");
  }

  useEffect(() => {
    dispatch({ type: "getTodos" });
  }, [dispatch]);

  const handleDeleteDialogClose = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteDialogClickOpen = (todo) => {
    setDialogTodo(todo);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDeleteAlert(false);
    showHideToast("تمت الحذف بنجاح");
  };

  const handleEditDialogClose = () => {
    setShowEditAlert(false);
  };

  const handleEditDialogClickOpen = (todo) => {
    setDialogTodo(todo);
    setShowEditAlert(true);
  };

  const handleEditSubmit = () => {
    dispatch({ type: "edited", payload: dialogTodo });

    setShowEditAlert(false);
    showHideToast("تمت التعديل بنجاح");
  };

  //  === EVENT HANDLERS ===

  const todoslist = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={handleDeleteDialogClickOpen}
        showEdit={handleEditDialogClickOpen}
      />
    );
  });

  return (
    <>
      {/* DELETE MODAL */}

      <Dialog
        open={showDeleteAlert}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف في حال اختيار زر الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>اغلاق</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* == DELETE MODAL == */}

      {/* EDIT MODAL */}

      <Dialog
        open={showEditAlert}
        onClose={handleEditDialogClose}
        style={{ direction: "rtl" }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="title"
            label="العنوان"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="name"
            name="desc"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo.desc}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, desc: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>الغاء</Button>
          <Button onClick={handleEditSubmit}>تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* == EDIT MODAL == */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "90vh", overflow: "scroll" }}
        >
          <CardContent>
            {/* TITLE */}
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />
            {/* == TITLE == */}

            {/* TOGGLE MENU */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              value={displayTodosType}
              exclusive
              onChange={handleDisplayTodosType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="nonCompleted">الغير منجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* == TOGGLE MENU == */}

            {/* TODO COMPONENT */}
            {todoslist}
            {/* == TODO COMPONENT == */}

            {/* INPUT + ADD */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  value={titleInp}
                  onChange={(e) => {
                    setTitleInt(e.target.value);
                  }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  onClick={handleAddClick}
                  disabled={titleInp.length == 0}
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* == INPUT + ADD == */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
