
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Container, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';



export default function AddressForm() {
    let { register, handleSubmit } = useForm();

    function onSubmit (data) {
        localStorage.setItem("address", JSON.stringify(data))
        alert("Thank you for ordering")
    }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <Container spacing={10}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <TextField
            required
            id="place"
            name="place"
            {...register('place')}
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contact"
            name="contact"
            {...register('contact')}
            label="Mobile"
            fullWidth
          />
        </Grid>
      </Grid>
        <Button variant="outlined" type='submit' color='primary'>Place order</Button>
    </React.Fragment>
    </Container>
    </form>
  );
}