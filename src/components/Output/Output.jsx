import { Paper } from "@mui/material";
import { Fragment } from "react";

const Output = (props) => {
  return (
    <Fragment>
      <b>Output</b>
      <Paper elevation={3}>
        <div style={{ "minHeight": "20vh","marginTop": "5px" ,'padding':'0 5px'}}>
          {props.output}
        </div>
      </Paper>
    </Fragment>
  );
};

export default Output;
