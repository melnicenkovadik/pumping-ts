import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  ListItemText,
  Divider,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell, TableBody, Paper,
} from '@material-ui/core';

import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import {styled} from '@mui/material/styles';

import {KeyboardArrowDown} from '@mui/icons-material';
import {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

export const CreateProgram: React.FC = () => {
  const [newExercises, setNewExercises] = React.useState('');
  const [myProgram, setMyProgram] = useState([]);
  const [field, setField] = useState([""]);
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

  const setExerciseToProgram = (title: string, element: any) => {
    const newArray = [...myProgram, {"title": title, listOfExercises: [element]}]
    // @ts-ignore
    setMyProgram(newArray)
    console.log('myProgram', myProgram);
  };
  const createProgram = () => {
    const newVal = [...myProgram]
    // @ts-ignore

    console.log(newVal);
  }

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
    '& .MuiTextField-root': {
      fontSize: 25,
    },
  });

  const handleCreateExercise = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // @ts-ignore
    const values = [...exercises];
    values.push({
      title: newExercises,
      open: false,
      listOfExercises: field,
    });
    if (newExercises.length > 3 && field[0].length > 2) {
      setExercises(values);
      setNewExercises('')
      setField([''])
    } else {
      alert('Так не пойдёт')
    }
    // console.log('values', values)
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    const {value} = e.target;
    setNewExercises(value)
  };

  const handleChangeInput = ({index, event}: { index: number, event: any }) => {
    event.preventDefault();
    const values = [...field];
    values[index] = event.target.value;
    setField(values);
    // console.log("Input: ", field);
  };


  const addField = () => {
    setField([...field, ""]);
  };

  const removeField = (index: number) => {
    const values = [...field];
    values.splice(index, 1);
    setField(values);
  };
  return (
      <Container>
        <Box>
          <FireNav>
            <Box>
              {exercises.map((exercise, index) => (
                  <>
                    <ListItemButton
                        key={exercise.title + index}
                        alignItems="flex-start"
                        onClick={() => expandExerciseHandler(exercise.title)}
                        sx={{
                          px: 3,
                          pt: 2.5,
                          pb: exercise.open ? 0 : 2.5,
                          width: '100%',
                          '&:hover, &:focus': {'& svg': {opacity: exercise.open ? 1 : 0}},
                        }}
                    >
                      <ListItemText
                          primary={exercise.title}
                          secondary={!exercise.open && exercise.listOfExercises.join(' , ')}
                          secondaryTypographyProps={{
                            noWrap: true,
                            color: exercise.open ? 'inherit' : 'primary',
                          }}
                          style={{fontSize: 28, fontWeight: 700, color: 'red'}}
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
                    <Divider/>
                    {exercise.open
                    && exercise.listOfExercises.map((item, index) => (
                        <div
                            key={item.trim() + index}
                        >
                          <ListItemButton
                              onClick={() => setExerciseToProgram(exercise.title, item)}
                              sx={{py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)'}}
                          >
                            <ListItemText
                                primary={item}
                                style={{fontSize: 10, opacity: '0.7'}}
                            />
                          </ListItemButton>
                        </div>
                    ))}
                    <Divider/>
                  </>
              ))}
            </Box>
          </FireNav>
        </Box>
        <Box
            component='form'
            onSubmit={handleCreateExercise}
        >
          <TextField
              style={{width: '100%', marginBottom: 10}}
              id="new-exercises"
              label='Группа мышц'
              variant="outlined"
              name='addExercise'
              autoComplete='off'
              value={newExercises}
              onChange={handleInputChange}
          />
          {newExercises.length > 3 && field.map((field, index) => (
              <Box key={index} style={{marginBottom: 10, width: '100%'}}>
                <TextField
                    style={{minWidth: '50%'}}
                    label={`Название упражнения #${index + 1}`}
                    autoComplete='off'
                    variant="outlined"
                    value={field}
                    onChange={(event) => handleChangeInput({index: index, event})}
                />
                <IconButton onClick={() => removeField(index)}>
                  <RemoveIcon/>
                </IconButton>
                <IconButton onClick={addField}>
                  <AddIcon/>
                </IconButton>
              </Box>
          ))}
          <Button style={{marginBottom: 10}} type="submit" variant="contained"
                  disabled={newExercises.length < 3 || field[0].length < 2}>Добавить
          </Button>
        </Box>
        <Button onClick={createProgram}>CreateProgram</Button>
        {myProgram.map(({title, listOfExercises}, index) => {
          return (
              <div>{title}:{[...listOfExercises]}</div>
          )
        })}
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
              {myProgram.map((row,index) => (
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
      </Container>
  );
};
