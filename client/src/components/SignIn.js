import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from './Styles';



export function SignIn() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  let history = useHistory()
  let user = {}

  const onSubmit = (data) => {

    fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.isManager === "true"){
        history.push({
          pathname: "/manage",
          state: {details: data}
        })
      }else{
        localStorage.setItem("user_name", data.firstName)
        localStorage.setItem("user_id", data.id)
        history.push({
          pathname: '/home',
          state: {detail: data.firstName}
        })
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            {...register('email')}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            {...register('password')}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="true" name="isManager" {...register('isManager')} color="primary" />}
            label="Sign me in as admin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
