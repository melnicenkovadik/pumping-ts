import * as React from 'react';
import {
  Box,
  Button,
  TextField,
  ListItemText,
  Divider,
  Container,
  IconButton,

} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

import {KeyboardArrowDown} from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";

import {useActions} from "../app/hooks/useActions";
import {useHistory} from "react-router-dom";

export const CreateProgram: React.FC = () => {
  const {fetchProgram} = useActions()
  const history = useHistory()
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
    fetchProgram(newVal)
    history.push("/my-program")
    console.log(newVal);
  }

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
        <Button variant="outlined" disabled={myProgram.length < 1} onClick={createProgram}>Сохранить программу
          тренеровок</Button>
        <Box>
          {exercises.map((exercise, index) => (
              <>
                <ListItemButton
                    key={exercise.title + index}
                    alignItems="flex-start"
                    onClick={() => expandExerciseHandler(exercise.title)}
                    sx={{
                      fontSize: 20,
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
        <Box
            component='form'
            onSubmit={handleCreateExercise}
            style={{marginTop: 40}}
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
        <Box>
          {myProgram.map(({listOfExercises}, index) => {
            return (
                <div key={index}>{[...listOfExercises]}</div>
            )
          })}
        </Box>
      </Container>
  );
};
