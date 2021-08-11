import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import InputMask from "react-input-mask";

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
  const { empresa, cnpj } = data[0];

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
              id="empresa"
              label="Nome da Empresa"
              name="empresa"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira um nome",
                pattern: {
                  value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                  message: "Dado inválido"
                }
              })}
              error={!!errors.empresa}
              defaultValue={empresa}
            />
            {errors.empresa && (
              <p className={classes.errorMessage}>{errors.empresa.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <InputMask mask="99.999.999/9999-99" maskChar=" ">
              {() => (
                <TextField
                  id="cnpj"
                  label="CNPJ da Empresa"
                  name="cnpj"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Insira um CNPJ",
                    pattern: {
                      value: /^[0-9]{2}.[0-9]{3}.[0-9]{3}[/][0-9]{4}-[0-9]{2}$/,
                      message: "Insira um CNPJ válido"
                    }
                  })}
                  error={!!errors.cnpj}
                  defaultValue={cnpj}
                />
              )}
            </InputMask>
            {errors.cnpj && (
              <p className={classes.errorMessage}>{errors.cnpj.message}</p>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
