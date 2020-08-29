import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';
import API from '../api'


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

const AddVideo = () => {
    const classes = useStyles();
    const [categories, setCategory] = useState()
    const [attributes, setAttributes] = useState({
        category_id: 1,
        title: '',
        attache: '',
        thumbnail: ''
    })
    const getCategories = async () => {
        const categories = await API.getCategories();
        setCategory(categories);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = (event) => {
        setAttributes(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }
        ))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(attributes)
        getCategories();
        setAttributes(prevState => ({
            ...prevState,
            category_id: 1,
            title: '',
            attache: '',
            thumbnail: '',
        }))
        // API.addVideo(attributes)
        //     .then(() => {
        //         setAttributes(prevState => ({
        //             attributes,
        //             ...prevState
        //         }))
        //     });
    }

    if (!categories) return <div>Loading .....</div>;


    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Hi! What kind of video you want to add?
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Video Title"
                            name="title"
                            autoComplete="title"
                            value={attributes.title}
                            onInput={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="category_id" name="category_id" value={attributes.category_id} onChange={handleChange}> 
                                {categories.map((category) => (
                                    <FormControlLabel key={category.id} value={category.id} checked={attributes.category_id == category.id} control={<Radio />} label={category.name} />
                                ))}
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="attache"
                            label="Attache"
                            type="attache"
                            id="attache"
                            autoComplete="attache"
                            value={attributes.attache}
                            onInput={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="thumbnail"
                            label="Youtube Embedded Url"
                            type="thumbnail"
                            id="thumbnail"
                            autoComplete="thumbnail"
                            value={attributes.thumbnail}
                            onInput={handleChange}
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
                    Add Video
                    </Button>
                </form>
            </div>
      </Container>
    )
}


export default AddVideo;