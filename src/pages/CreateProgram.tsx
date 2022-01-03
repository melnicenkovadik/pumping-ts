import * as React from 'react';
import {
  Box, Button, TextField, ListItemText, Divider, Container,
} from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

import { KeyboardArrowDown } from '@mui/icons-material';

export const CreateProgram: React.FC = () => {
  const [newExercises, setNewExercises] = React.useState('');
  const [exercises, setExercises] = React.useState([
    {
      title: 'Руки',
      open: false,
      listOfExercises: ['Концентрированые подьемы на бицепс', 'Отжимания на брусьях', 'Подьем штанги на бицепс', 'Французкий жим лежа со штангой'],
    },
    {
      title: 'Растяжка',
      open: false,
      listOfExercises: ['Растяжка грудных мышц', 'Растяжка задней поверхности бедра', 'Растяжка разгибателей спины'],
    },
    {
      title: 'Ноги',
      open: false,
      listOfExercises: ['Выпады со штангой', 'Жим ногами в тренажере', 'Приседания со штангой', 'Разгибания ног в тренажере'],
    },
  ]);

  const expandExerciseHandler = (key: string) => {
    const newVal = exercises.map((exercise) => {
      if (key === exercise.title) {
        exercise.open = !exercise.open;
      }
      return exercise;
    });
    setExercises(newVal);
  };

  const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 25,
    },
  });

  const handleCreateExercise = () => {
    // @ts-ignore
    setExercises([...exercises, {
      title: newExercises,
      open: false,
      listOfExercises: ['item', 'item2'],
    }]);
  };

  return (
    <>
      {/* <Box */}
      {/*  component='div' */}
      {/*  sx={{ */}
      {/*    '& .MuiTextField-root': { m: 1, width: '25ch' }, */}
      {/*  }} */}
      {/* > */}
      {/*  <TextField */}
      {/*    id='outlined-hands' */}
      {/*    label='hands' */}
      {/*    value={exercises.hands} */}
      {/*    onChange={(e) => handleChange('hands', e)} */}
      {/*  /> */}
      {/*  <TextField */}
      {/*    id='outlined-legs' */}
      {/*    label='legs' */}
      {/*    value={exercises.legs} */}
      {/*    onChange={(e) => handleChange('legs', e)} */}
      {/*  /> */}
      {/*  <TextField */}
      {/*    id='outlined-arms' */}
      {/*    label='arms' */}
      {/*    value={exercises.arms} */}
      {/*    onChange={(e) => handleChange('arms', e)} */}
      {/*  /> */}
      {/*  <Button */}
      {/*    onClick={() => console.log(exercises)} */}
      {/*  >Press</Button> */}
      {/* </Box> */}
      <Container>
        <Box>
          <FireNav>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
            }}
            >
              <TextField
                style={{ width: '100%' }}
                id="new-exercises"
                label="Добавить упражнение"
                value={newExercises}
                onChange={e => setNewExercises(e.target.value)}
              />
              <Button
                onClick={handleCreateExercise}
                color="secondary"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
                }}
              >
                Secondary
              </Button>
            </div>

            <Box>
              {exercises.map((exercise, index) => (
                <>
                  <ListItemButton
                    key={index}
                    alignItems="flex-start"
                    onClick={() => expandExerciseHandler(exercise.title)}
                    sx={{
                      px: 3,
                      pt: 2.5,
                      pb: exercise.open ? 0 : 2.5,
                      width: '100%',
                      '&:hover, &:focus': { '& svg': { opacity: exercise.open ? 1 : 0 } },
                    }}
                  >
                    <ListItemText
                      primary={exercise.title}
                      secondary={!exercise.open && exercise.listOfExercises.join(' , ')}
                      secondaryTypographyProps={{
                        noWrap: true,
                        color: exercise.open ? 'inherit' : 'primary',
                      }}
                      style={{ fontSize: 28, fontWeight: 700, color: 'red' }}
                    />
                    <KeyboardArrowDown
                      sx={{
                        mr: -1,
                        opacity: 0,
                        transform: exercise.open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                      }}
                    />
                  </ListItemButton>
                  <Divider />
                  {exercise.open
                  && exercise.listOfExercises.map((item, index) => (
                    <ListItemButton
                      key={index}
                      sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                    >
                      <ListItemText
                        primary={item}
                        style={{ fontSize: 10, opacity: '0.7' }}
                      />
                    </ListItemButton>
                  ))}
                  <Divider />
                </>
              ))}
            </Box>
          </FireNav>
        </Box>
      </Container>
    </>
  );
};
