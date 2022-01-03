import React from 'react';
import {Box, Container, Grid, Paper} from "@mui/material";
import LoginComponent from "../../LoginComponent";

const Content: React.FC = ({children}) => (

        <Container maxWidth="xl">
            <Grid container spacing={1} >
                <Grid item xs={12} sm={9}>
                    <Paper style={{minHeight: '100vh',padding:20, background: 'lightblue'}}>
                        <Container>
                            <Box>
                                {children}
                            </Box>
                        </Container>
                    </Paper>
                </Grid>
                <Grid item container direction="column" xs={12} sm={3}>
                    <Grid item>
                        <Paper style={{minHeight: '20vh',padding:20, background: 'orange'}}>
                            <Container>
                                <Box>
                                    <LoginComponent/>
                                </Box>
                            </Container>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
);


export default Content;
