import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import StepperForm from "./StepperForm";

const useStyles = makeStyles(theme => ({
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    color: "#2A8BFF",
    fontWeight: "bold",
    letterSpacing: "0.5rem"
  },
  border: {
    border: "0.15rem solid #2A8BFF",
    borderRadius: "20px",
    padding: "2%",
    width: "19rem",
    textAlign: "center"
  },
  topLayout: {
    margin: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 0"
    }
  },
  paperLayout: {
    padding: "2rem",
    [theme.breakpoints.up("md")]: {
      width: "35em"
    },
    marginTop: "10rem",
    margin: "auto",
    border: "1px solid #ebedf0",
    borderRadius: "4px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "3rem"
    }
  },
  testLayout: {
    left: "20px",
    border: "1px solid #ebedf0",
    justifyContent: "flex-end"
  }
}));

export default function Register() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.topLayout}
      >
        <Grid item display="flex" md={11} xs={11}>
          <Paper className={classes.paperLayout}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <div className={classes.logo}>
                  <div className={classes.border}>FORMULÁRIO</div>
                </div>
              </Grid>
              <Grid item md={12} xs={12}>
                <StepperForm />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
