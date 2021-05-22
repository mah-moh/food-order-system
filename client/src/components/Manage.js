import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { Container, Typography, Button, Card, Grid, CardContent, CardActions } from '@material-ui/core';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Manage() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const food = []



  const onSubmit = (data) => {
      fetch("http://localhost:8080/add/food",{
          method:"POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => { 
          console.log(data)
          alert("Added")
      })
  }


  return (
    <Container>
        <Typography>Add today's menu:</Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="eg:burger" name="title" {...register('title')} inputProps={{ 'aria-label': 'description' }} />
            <Input placeholder="eg:100৳" name="price" {...register('price')} inputProps={{ 'aria-label': 'description' }} />
            <Button
                type="submit"
                variant="contained"
              >
            Add
          </Button>
        </form>
    </Container>
  );
}
