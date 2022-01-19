import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {useTypedSelector} from "../../app/hooks";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
    }),
);

function getSteps() {
    return ['Выбери упржнения для твоей программы тренировок', 'Добавь программу', 'Пользуйся на здоровье!'];
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return `Выбери упржнения для твоей программы тренировок на ближайший месяц (мы советуем менять программу каждый месяц)`;
        case 1:
            return 'Добавь программу с выбраными упражнениями';
        case 2:
            return `Переходи в раздел "Моя программа" и следуй плану на этот месяц`;
        default:
            return 'Начать!';
    }
}

export default function PreviewStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const history = useHistory()
    const {isAuth} = useTypedSelector(state => state.user)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        if (isAuth){
            history.push('/create-program')
        }
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Закончить обучение' : 'Дальше'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Начнём!</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Я хочу создать программу тренировок!
                    </Button>
                </Paper>
            )}
        </div>
    );
}
