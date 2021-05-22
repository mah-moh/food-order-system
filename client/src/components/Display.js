import { Card, Grid, CardContent, Typography, Button, Fab } from '@material-ui/core';
import { useHistory } from "react-router";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    marginBottom: 20,
    marginRight: 20
  },
});


const Display = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const [count, setCount] = React.useState(1);

    function onSubmit(props) {
      console.log(props)
      fetch("http://localhost:8080/post/order",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(props)
      })
    }

    function checkout() {
      console.log("yes")
      history.push("/checkout")
    }



    return (
      <Grid container>
        <Grid item xs={8}><h1>Hey, {localStorage.user_name}</h1></Grid>
        <Grid item xs={4}><Button onClick={()=>checkout()}
                type="submit"
                variant="contained"
              >
                Checkout
          </Button></Grid>
        {props.data.map(item => (
          
            <Grid item xs={4}>
              <Card className={classes.root}>
              <CardActionArea >
                {/* <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}  
              </CardActionArea>
              <CardActions >
                <CardContent>{item.title}</CardContent>
                <CardContent>Tk. {item.price}</CardContent>
                <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
                  <AddIcon onClick={ () => {
                    let order = 
                      {"user_id" : parseInt(localStorage.getItem("user_id")),
                        "food_id": item.id
                      } 
                      onSubmit(order)
                    }
                  } 
                  />
                </Fab>
              </CardActions>
            </Card>
          </Grid>
        
        ))}
      </Grid>
    );
}

export default Display;


