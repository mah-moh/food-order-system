import {FormControlLabel, Avatar, Button, CssBaseline, TextField, Checkbox, Link, Grid, Box, Typography, Container} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from './Styles';

  
  export default function SignIn() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const history = useHistory()
    
    const onSubmit = (data) => {
        fetch("http://localhost:8080/admin/register",{
          method: "POST",
          headers: {'Content-Type': "application/json"},
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          history.push({
            pathname:"/manage",
            state: {details: data}
          })
        })
    }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Registration
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
