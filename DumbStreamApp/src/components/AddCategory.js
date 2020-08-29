import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const AddCategory = () => {
    const classes = useStyles();
    // const [name, setName] = useState("")

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Hi! What kind of category you want to add?
                </Typography>

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Category Name"
                            name="title"
                            autoComplete="title"
                            />
                        </Grid>
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                    Add Category
                    </Button>
                </form>
            </div>
      </Container>
    )
}


export default AddCategory;