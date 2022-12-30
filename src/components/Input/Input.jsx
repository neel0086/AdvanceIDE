import { useRef } from "react";
import { Grid, Button, TextareaAutosize } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Input = (props) => {
  let InputRef = useRef(null);

  const inputHandler = () => {
    props.forewardedRef(InputRef.current.value);
  };

  return (
    <Grid item xs={12}>
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid container alignItems="center" item xs={12} sm={2}>
          {/* button */}
          <Button
            type="submit"
            variant="contained"
            startIcon={<PlayArrowIcon />}
            color="success"
            size="large"
            style={{ margin: "auto" }}
            onClick={props.onClick}
          >
            Run
          </Button>
        </Grid>
        <Grid item xs={12} sm={10}>
          {/* input field */}
          <div style={{ minHeight: "7vh" }}>
            <b>Input</b>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              ref={InputRef}
              onBlur={inputHandler}
              style={{
                width: "99%",
                maxHeight: "100%",
                fontSize: "17px",
                backgroundColor: "#121212",
                color: "white",
                borderRadius: "5px",
                marginTop: "3px",
              }}
            ></TextareaAutosize>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Input;
