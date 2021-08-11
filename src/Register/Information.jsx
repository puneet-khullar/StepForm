import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, MenuItem } from "@material-ui/core";
import ReactHookFormSelect from "../Components/ReactHookFormSelect";

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
    width: "100%"
  },
  errorMessage: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.2rem"
  },
  select: {
    variant: "outlined"
  }
}));

export default function Information({
  formProps: { register, errors, control },
  data
}) {
  const classes = useStyles();
  const { nome, email, telefone, valor, numero_prestacao, profissao } = data[0];
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
              id="nome"
              label="*Nome Completo"
              name="nome"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira seu nome completo",
                pattern: {
                  value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                  message: "Insira um nome válido"
                }
              })}
              error={!!errors.nome}
              defaultValue={nome}
            />
            {errors.nome && (
              <p className={classes.errorMessage}>{errors.nome.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira seu email",
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                  message: "Insira um email válido"
                }
              })}
              error={!!errors.email}
              defaultValue={email}
            />
            {errors.email && (
              <p className={classes.errorMessage}>{errors.email.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="telefone"
              label="Seu telefone com DDD"
              name="telefone"
              type="tel"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira seu telefone",
                pattern: {
                  value: /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/,
                  message: "Insira um telefone válido"
                }
              })}
              error={!!errors.telefone}
              defaultValue={telefone}
            />
            {errors.telefone && (
              <p className={classes.errorMessage}>{errors.telefone.message}</p>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="valor"
              label="Quanto você precisa?"
              name="valor"
              type="number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira um valor",
                pattern: {
                  value: /^([1-9]{1}[\d]{0,2}(\.[\d]{3})*(,[\d]{0,2})?|[1-9]{1}[\d]{0,}(,[\d]{0,2})?|0(,[\d]{0,2})?|(,[\d]{1,2})?)$/,
                  message: "DIgite um valor válido"
                }
              })}
              error={!!errors.valor}
              defaultValue={valor}
            />
            {errors.valor && (
              <p className={classes.errorMessage}>{errors.valor.message}</p>
            )}
          </Grid>
          <Grid item xs={6}>
            <ReactHookFormSelect
              id="numero_prestacao"
              name="numero_prestacao"
              className={classes.textField}
              label="Em quantas parcelas?"
              control={control}
              error={!!errors.numero_prestacao}
              defaultValue={numero_prestacao || ""}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="">Escolha uma opção</MenuItem>
              <MenuItem value="3">03 parcelas</MenuItem>
              <MenuItem value="6">06 parcelas</MenuItem>
              <MenuItem value="9">09 parcelas</MenuItem>
              <MenuItem value="12">12 parcelas</MenuItem>
              <MenuItem value="16">16 parcelas</MenuItem>
              <MenuItem value="18">18 parcelas</MenuItem>
            </ReactHookFormSelect>
            {errors.numero_prestacao && (
              <p className={classes.errorMessage}>
                {errors.numero_prestacao.message}
              </p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <ReactHookFormSelect
              id="profissao"
              name="profissao"
              label="Profissão"
              className={classes.textField}
              control={control}
              error={!!errors.profissao}
              defaultValue={profissao || ""}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="">Escolha uma opção</MenuItem>
              <MenuItem value="servidor">Servidor Público</MenuItem>
              <MenuItem value="clt">CLT Empresa Privada</MenuItem>
              <MenuItem value="autonomo">Autônomo</MenuItem>
              <MenuItem value="desempregado">Desempregado</MenuItem>
              <MenuItem value="empresario">Empresário</MenuItem>
            </ReactHookFormSelect>
            {errors.profissao && (
              <p className={classes.errorMessage}>{errors.profissao.message}</p>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
