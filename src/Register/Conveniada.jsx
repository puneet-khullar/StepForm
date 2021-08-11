import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "-1rem 0 2rem 0",
    padding: "0 7rem",
    [theme.breakpoints.down("xs")]: {
      padding: "0"
    },
    [theme.breakpoints.down("md")]: {
      padding: "0"
    },
    marginTop: "auto"
  },
  textField: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },
  errorMessage: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.2rem"
  }
}));

export default function Conveniada({ formProps: { register, errors }, data }) {
  const classes = useStyles();
  const { cheque, rg } = data[0];
  const FILE_SIZE = 900 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];
  const handler = e => {
    console.log("files upload", e.target.files);
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={12} xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              id="cheque"
              label="Seus 3 Últimos Contracheques"
              name="cheque"
              type="file"
              inputProps={{ multiple: true }}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handler}
              value={cheque}
              ref={register({
                required: "Insira um arquivo",
                validate: {
                  fileType: value => SUPPORTED_FORMATS.includes(value.type),
                  fileSize: value => value.size <= FILE_SIZE
                }
              })}
              error={!!errors.cheque}
              defaultValue={cheque}
            />
            {errors.cheque && (
              <p className={classes.errorMessage}>{errors.cheque.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              id="rg"
              label="Seu RG"
              name="rg"
              type="file"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={handler}
              value={rg}
              ref={register({
                required: "Insira um arquivo",
                validate: {
                  fileType: value => SUPPORTED_FORMATS.includes(value.type),
                  fileSize: value => value.size <= FILE_SIZE
                }
              })}
              error={!!errors.rg}
              defaultValue={rg}
            />
            {errors.rg && (
              <p className={classes.errorMessage}>{errors.rg.message}</p>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
