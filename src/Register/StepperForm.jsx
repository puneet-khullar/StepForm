import React, { useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  StepConnector
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Check } from "@material-ui/icons";

import Information from "./Information";
import Account from "./Account";
import { StoreContext } from "../Context/store";
import Cadastro from "./Cadastro";
import Nova from "./Nova";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  instructions2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: "10vw",
    marginRight: "7vw"
  },
  buttonLayout: {
    marginLeft: "7rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0"
    }
  }
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#2A8BFF"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#2A8BFF"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center"
  },
  active: {
    color: "#2A8BFF"
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  },
  completed: {
    color: "#2A8BFF",
    zIndex: 1,
    fontSize: 20
  }
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool
};

const informationSchema = yup.object().shape({
  nome: yup.mixed().required("Este campo é obrigatório."),
  email: yup.string().required("Este campo é obrigatório."),
  telefone: yup.number().required("Este campo é obrigatório."),
  valor: yup.number().required("Este campo é obrigatório."),
  numero_prestacao: yup.string().required("Este campo é obrigatório.")
});

const accountSchema = yup.object().shape({
  data_nascimento: yup.string().required("Este campo é obrigatório."),
  cpf: yup.number().required("Este campo é obrigatório."),
  cargo: yup.string().required("Este campo é obrigatório."),
  data_admissao: yup.string().required("Este campo é obrigatório."),
  sal_bruto: yup.number().required("Este campo é obrigatório."),
  sal_liq: yup.number().required("Este campo é obrigatório."),
  goal: yup.string().required("Este campo é obrigatório.")
});

const cadastroSchema = yup.object().shape({
  empresa: yup.string().required("Este campo é obrigatório."),
  cnpj: yup.number("Cnpj invalido").required("Este campo é obrigatório.")
});

const novaSchema = yup.object().shape({
  quantidade_funcionarios: yup.string().required("Este campo é obrigatório."),
  nome_rh: yup.string().required("Este campo é obrigatório."),
  email_rh: yup.string().required("Este campo é obrigatório."),
  telefone_rh: yup.string().required("Este campo é obrigatório.")
});

const formatter = new Intl.NumberFormat("pt", {
  style: "currency",
  currency: "BRL"
});

function getSteps() {
  return ["Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4"];
}

export default function StepperForm() {
  const classes = useStyles();

  const { information, account, cadastro, nova } = useContext(StoreContext);
  const informationForm = useForm({
    validationSchema: informationSchema
  });

  const accountForm = useForm({
    validationSchema: accountSchema
  });

  const cadastroForm = useForm({
    validationSchema: cadastroSchema
  });

  const novaForm = useForm({
    validationSchema: novaSchema
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = e => {
    information[1]({});
    account[1]({});
    cadastro[1]({});
    nova[1]({});
    setActiveStep(0);

    let data = { information, account, cadastro, nova };
    //alert(JSON.stringify(data));

    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = data => {
    if (activeStep === 0) {
      information[1](data);
    } else if (activeStep === 1) {
      account[1](data);
    } else if (activeStep === 2) {
      cadastro[1](data);
    } else if (activeStep === 3) {
      if (conveniadas.includes(cadastro[0].cnpj)) {
      } else {
        nova[1](data);
      }
    }
    handleNext();
  };

  function getStepContent(stepIndex) {
    if (stepIndex === 0) {
      return <Information formProps={informationForm} data={information} />;
    } else if (stepIndex === 1) {
      if (information[0].profissao === "clt") {
        return <Account formProps={accountForm} data={account} />;
      } else {
        return "Direcionar para o pipe lead fora do target";
      }
    } else if (stepIndex === 2) {
      return <Cadastro formProps={cadastroForm} data={cadastro} />;
    } else if (stepIndex === 3) {
      if (conveniadas.includes(cadastro[0].cnpj)) {
        return "Direcionar para o pipe lead fora do target";
      } else {
        return <Nova formProps={novaForm} data={nova} />;
      }
    } else {
      return "Página não encontrada";
    }
  }

  return (
    <div className={classes.root}>
      <form
        onSubmit={
          activeStep === 0
            ? informationForm.handleSubmit(onSubmit)
            : activeStep === 1
            ? accountForm.handleSubmit(onSubmit)
            : activeStep === 2
            ? cadastroForm.handleSubmit(onSubmit)
            : novaForm.handleSubmit(onSubmit)
        }
      >
        {/*Render stepper bar */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography align="inherit" className={classes.instructions2}>
                <h2>Confirme seus dados</h2>
                <ul>
                  <li class="list-group-item">
                    <b>Nome:</b> {information[0].nome}
                  </li>
                  <li class="list-group-item">
                    <b>Email:</b> {information[0].email}
                  </li>
                  <li class="list-group-item">
                    <b>Data Nascimento:</b> {account[0].data_nascimento}
                  </li>
                  <li class="list-group-item">
                    <b>CPF:</b> {account[0].cpf}
                  </li>
                  <li class="list-group-item">
                    <b>Profissao:</b> {information[0].profissao}
                  </li>
                  <li class="list-group-item">
                    <b>Cargo:</b> {account[0].cargo}
                  </li>
                  <li class="list-group-item">
                    <b>Data Admissão:</b> {account[0].data_admissao}
                  </li>
                  <li class="list-group-item">
                    <b>Valor Solicitado:</b>{" "}
                    {formatter.format(information[0].valor)}
                  </li>
                  <li class="list-group-item">
                    <b>Quantidade de Parcelas:</b>{" "}
                    {information[0].numero_prestacao} parcelas
                  </li>
                </ul>
                <br />
              </Typography>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                variant="outlined"
              >
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleReset}>
                Confirmar
              </Button>
            </div>
          ) : activeStep === 1 && information[0].profissao !== "clt" ? (
            <div className={classes.buttonLayout}>
              <Typography className={classes.instructions}>
                Direcionar para o pipe lead fora do target <br />
              </Typography>
              <Button variant="contained" color="primary" onClick={handleReset}>
                Finalizar
              </Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <div className={classes.buttonLayout}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                  variant="outlined"
                >
                  Voltar
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {activeStep === steps.length - 1
                    ? "Finalizar"
                    : activeStep === 1 && information[0].profissao !== "clt"
                    ? "Finalizar"
                    : "Próximo"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
/* {conveniada[0].cheque.files.name}*/
