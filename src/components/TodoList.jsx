import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import { useTodos, useTodosDispatch } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../contexts/ToastContext";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const { showHideToast } = useToast();

  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // ----Filteration--------------->>>>
  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      if (displayTodosType == "completed") {
        return t.isCompleted;
      } else if (displayTodosType == "not-completed") {
        return !t.isCompleted;
      } else {
        return true;
      }
    });
  }, [todos, displayTodosType]);
  const todosJsx = filteredTodos.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdatedialog}
      />
    );
  });

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function changeDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("تمت الاضافة بنجاح");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("تم الحذف  بنجاح");
  }

  function openUpdatedialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    dispatch({ type: "updated", payload: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("تم التحديث بنجاح");
  }
  return (
    <>
      {/* Delete Modal */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        dir="rtl"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          هل انت متاكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "18px" }}
          >
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            style={{ fontSize: "14px", fontWeight: "900" }}
            onClick={handleDeleteDialogClose}
          >
            اغلاق
          </Button>
          <Button
            style={{ fontSize: "14px", fontWeight: "900" }}
            onClick={handleDeleteConfirm}
          >
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ----------------- Delete Modal ---------------- */}

      {/* Update Modal */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        dir="rtl"
        sx={{
          marginRight: "clamp(15px, 2vw, 0px)",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontSize: "20px", fontWeight: "900" }}
        >
          تعديل مهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "20px",
              },
              "& .MuiInputLabel-root": {
                fontWeight: "900",
                fontSize: "18px",
              },
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "20px",
              },
              "& .MuiInputLabel-root": {
                fontWeight: "900",
                fontSize: "18px",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            style={{ fontSize: "14px", fontWeight: "600" }}
            onClick={handleUpdateClose}
          >
            اغلاق
          </Button>
          <Button
            style={{ fontSize: "14px", fontWeight: "900" }}
            onClick={handleUpdateConfirm}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ------------ Update Modal ----------- */}

      <Container maxWidth="sm" className="text-center my-5">
        <Card
          sx={{
            minWidth: 275,
          }}
        >
          <CardContent>
            <Typography variant="h2" style={{ fontWeight: "bold" }}>
              مهامي
            </Typography>
            <Divider />

            {/* filter buttons */}
            <ToggleButtonGroup
              dir="ltr"
              className="mt-8"
              value={displayTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="not-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ===== FILTER BUTTON ==== */}

            {/* ALL TODOS */}
            {todosJsx}
            {/* ALL TODOS */}

            {/* Input + ADDBUTTON */}
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "20px",
              }}
            >
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  className="w-full"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  className="w-full h-full"
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.trim() === ""}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* ----------- Input + ADDBUTTON -------- */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
