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
  const { quantidade_funcionarios, nome_rh, email_rh, telefone_rh } = data[0];

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
              id="nome_rh"
              label="Nome do Contato do RH"
              name="nome_rh"
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
              error={!!errors.nome_rh}
              defaultValue={nome_rh}
            />
            {errors.nome_rh && (
              <p className={classes.errorMessage}>{errors.nome_rh.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="email_rh"
              label="Email do RH"
              name="email_rh"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira um email",
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: "Insira um email válido"
                }
              })}
              error={!!errors.email_rh}
              defaultValue={email_rh}
            />
            {errors.email_rh && (
              <p className={classes.errorMessage}>{errors.email_rh.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="telefone_rh"
              label="Telefone do RH"
              name="telefone_rh"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira um telefone",
                pattern: {
                  value: /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
                  message: "Insira um telefone válido"
                }
              })}
              error={!!errors.telefone_rh}
              defaultValue={telefone_rh}
            />
            {errors.telefone_rh && (
              <p className={classes.errorMessage}>
                {errors.telefone_rh.message}
              </p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <label>Quantos funcionários a empresa possui?</label>
            <select
              id="quantidade_funcionarios"
              name="quantidade_funcionarios"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              ref={register({ required: "Escolha uma opção" })}
              error={!!errors.quantidade_funcionarios}
              defaultValue={quantidade_funcionarios}
            >
              <option value="">Escolha uma opção</option>
              <option value="10">Até 10 funcionários</option>
              <option value="50">Entre 11 e 50 funcionários</option>
              <option value="100">Entre 51 e 100 funcionários</option>
              <option value="500">Entre 101 e 500 funcionários</option>
              <option value="1000">Entre 501 e 1000 funcionários</option>
              <option value="1001">Mais de 1000 funcionários</option>
            </select>
            {errors.quantidade_funcionarios && (
              <p className={classes.errorMessage}>
                {errors.quantidade_funcionarios.message}
              </p>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
