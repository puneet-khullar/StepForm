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

export default function Account({ formProps: { register, errors }, data }) {
  const classes = useStyles();
  const {
    data_nascimento,
    cpf,
    cargo,
    data_admissao,
    sal_bruto,
    sal_liq,
    goal
  } = data[0];

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item md={12} xs={12}>
            <InputMask mask="99/99/9999" maskChar=" ">
              {() => (
                <TextField
                  id="data_nascimento"
                  label="Data de Nascimento"
                  name="data_nascimento"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Insira sua data de nascimento"
                  })}
                  error={!!errors.data_nascimento}
                  defaultValue={data_nascimento}
                />
              )}
            </InputMask>
            {errors.data_nascimento && (
              <p className={classes.errorMessage}>
                {errors.data_nascimento.message}
              </p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <InputMask mask="999.999.999-99" maskChar=" ">
              {() => (
                <TextField
                  id="cpf"
                  label="Seu CPF"
                  name="cpf"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Insira seu CPF",
                    pattern: {
                      value: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
                      message: "Digite um CPF válido para continuar"
                    }
                  })}
                  error={!!errors.cpf}
                  defaultValue={cpf}
                />
              )}
            </InputMask>

            {errors.cpf && (
              <p className={classes.errorMessage}>{errors.cpf.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              id="cargo"
              label="Seu Cargo Atual"
              name="cargo"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              inputRef={register({
                required: "Insira seu cargo",
                pattern: {
                  value: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                  message: "Dado inválido"
                }
              })}
              error={!!errors.cargo}
              defaultValue={cargo}
            />
            {errors.cargo && (
              <p className={classes.errorMessage}>{errors.cargo.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <InputMask mask="99/99/9999" maskChar=" ">
              {() => (
                <TextField
                  id="data_admissao"
                  label="Sua Data de Admissão"
                  name="data_admissao"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  inputRef={register({
                    required: "Insira sua data de admissão"
                  })}
                  error={!!errors.data_admissao}
                  defaultValue={data_admissao}
                />
              )}
            </InputMask>
            {errors.data_admissao && (
              <p className={classes.errorMessage}>
                {errors.data_admissao.message}
              </p>
            )}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              id="sal_bruto"
              label="Seu Salário Bruto"
              name="sal_bruto"
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
              error={!!errors.sal_bruto}
              defaultValue={sal_bruto}
            />
            {errors.sal_bruto && (
              <p className={classes.errorMessage}>{errors.sal_bruto.message}</p>
            )}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              id="sal_liq"
              label="Seu Salário Líquido"
              name="sal_liq"
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
              error={!!errors.sal_liq}
              defaultValue={sal_liq}
            />
            {errors.sal_liq && (
              <p className={classes.errorMessage}>{errors.sal_liq.message}</p>
            )}
          </Grid>
          <Grid item md={12} xs={12}>
            <label>Finalidade do Empréstimo</label>
            <select
              id="goal"
              name="goal"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              ref={register({ required: "Escolha uma opção" })}
              error={!!errors.goal}
              defaultValue={goal}
            >
              <option value="">Escolha uma opção</option>
              <option value="viagem">Fazer viagem</option>
              <option value="medico">Despesas Médicas</option>
              <option value="casa">Comprar Casa Própria</option>
              <option value="carro">Financiamento de Veículo</option>
              <option value="casamento">Casamento</option>
              <option value="educacao">Educação</option>
              <option value="negocio">Investir no Próprio Negócio</option>
              <option value="dividas">Quitar Dívidas</option>
              <option value="urgente">Compras Urgentes</option>
              <option value="outros">Outros</option>
            </select>
            {errors.goal && (
              <p className={classes.errorMessage}>{errors.goal.message}</p>
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
