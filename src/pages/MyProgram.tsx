import React from 'react';
import {useHistory} from 'react-router-dom';
import {useTypedSelector} from "../app/hooks";
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import CircularStatic from "../components/Progres";

export const MyProgram: React.FC = () => {
    const history = useHistory();
    const {loading, error, program} = useTypedSelector(state => state.program)
    console.log({loading, error, program})
    return (
        <Container>
            <div className="row">
                <h1>MyProgram Page</h1>
                {!loading ?
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Упражнение</TableCell>
                                    <TableCell align="right">Группа мышц</TableCell>
                                    <TableCell align="right">Ккал/мин&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {program.map((row, index) => (
                                    <TableRow
                                        key={row["listOfExercises"]}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row["listOfExercises"]}
                                        </TableCell>
                                        <TableCell align="right">{row["title"]}</TableCell>
                                        <TableCell align="right">{index * 2}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <CircularStatic/>
                }
                <Button
                    type="button"
                    className="btn"
                    cy-data="go-back-button"
                    onClick={() => history.goBack()}
                >
                    Go back
                </Button>
            </div>
        </Container>
    );
};
