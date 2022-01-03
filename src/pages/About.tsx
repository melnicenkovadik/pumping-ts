import React from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Button, Container} from "@mui/material";

export const About: React.FC = () => {
  const history = useHistory();

  return (
      <Container>
        <Box>

          <div className="row">
            <h1>About</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              possimus doloribus error cumque autem asperiores, ullam deserunt
              quidem omnis doloremque itaque eius eaque sint facilis unde tenetur
              reiciendis aliquam soluta?
            </p>
            <Button
                type="button"
                className="btn"
                cy-data="go-back-button"
                onClick={() => history.goBack()}
            >
              Go back
            </Button>
          </div>
        </Box>
      </Container>
  );
};
