import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useTodosDispatch } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: todo });
    showHideToast("تم التعديل بنجاح");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          background: "#1A237E",
          color: "white",
          marginTop: "20px",
          "&:hover": {
            boxShadow: "0 7px 7px rgba(0,0,0,0.4)",
            paddingTop: "10px",
            paddingBottom: "10px",
          },
          transition: "all 0.3s ease",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size="grow" sx={{ minWidth: 0, overflow: "hidden" }}>
              <Typography
                variant="h6"
                className="text-right"
                sx={{
                  overflowWrap: "anywhere",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                className="text-right"
                sx={{ overflowWrap: "anywhere", fontSize: "14px" }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid
              size="auto"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              <IconButton
                sx={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "2px solid #8bc34a",
                  "&:hover": {
                    backgroundColor: "#c5c5c5",
                    boxShadow: "0 7px 7px rgba(0, 0, 0, 0.4)",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={() => {
                  handleCheckClick();
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                sx={{
                  color: "#2B7FFF",
                  background: "white",
                  border: "solid #2B7FFF 2px",
                  "&:hover": {
                    backgroundColor: "#c5c5c5",
                    boxShadow: "0 7px 7px rgba(0, 0, 0, 0.4)",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                sx={{
                  color: "#FB2C36",
                  background: "white",
                  border: "solid #FB2C36 2px",
                  "&:hover": {
                    backgroundColor: "#c5c5c5",
                    boxShadow: "0 7px 7px rgba(0, 0, 0, 0.4)",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ACTION BUTTONS */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
