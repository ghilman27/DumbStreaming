import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button, Icon, IconButton } from '@material-ui/core';
import { Save, Delete } from '@material-ui/icons';
import API from '../api';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    availCat: {
      marginTop: theme.spacing(8)
    }
}));

const CategoryForm = ({ handleCategoriesChange, handleVideosChange, categories }) => {
    const classes = useStyles();

    let initialCategories = {};
    categories.map(category => {
      initialCategories = {...initialCategories, [category.id]: category.name}
    })
    const [catNames, changeCatNames] = useState(initialCategories);
    const [name, setName] = useState('');

    const handleAddCategory = async (event) => {
      event.preventDefault();
      await API.addCategory( { name } );
      alert(`Categories ${name} has been added`);
      setName('');
      await handleCategoriesChange();
    }

    const handleEditCategory = async (event) => {
      event.preventDefault();
      const id = event.currentTarget.value;
      await API.editCategory( { name: catNames[id] }, id);
      alert(`Category has been edited to ${catNames[id]}`);
      await handleCategoriesChange();
      await handleVideosChange();
    }

    const handleDeleteCategory = async (event) => {
      event.preventDefault();
      const id = event.currentTarget.value;
      await API.deleteCategory(id)
      alert(`Category ${catNames[id]} has been deleted`);
      await handleCategoriesChange();
      await handleVideosChange();
    }

    const handleChangeName = (event) => {
      event.preventDefault();
      event.persist();
      changeCatNames(prevNames => ({
        ...prevNames,
        [event.target.id]: event.target.value
      }))
    }
    

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Hi! What kind of category you want to add?
                </Typography>

                <form className={classes.form} onSubmit={handleAddCategory}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Category Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onInput={e => setName(e.target.value)}
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

                <Typography className={classes.availCat} component="h1" variant="h5">
                    Choose category to edit
                </Typography>

                <form className={classes.form}>
                  {categories.map(category => (
                    <Grid key={category.id} container spacing={2} alignItems='center'>
                        <Grid item xs={8}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id={category.id}
                            label={`previous name: ${category.name}`}
                            name={category.name}
                            autoComplete="name"
                            defaultValue={category.name}
                            onInput={handleChangeName}
                            />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<Save />}
                            onClick={handleEditCategory}
                            value={category.id}
                          >
                          </Button>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            color="primary"
                            size="large"
                            className={classes.button}
                            startIcon={<Delete />}
                            onClick={handleDeleteCategory}
                            value={category.id}
                          >
                          </Button>
                        </Grid>
                    </Grid>
                  ))}
                </form>
            </div>
      </Container>
    )
}


export default CategoryForm;