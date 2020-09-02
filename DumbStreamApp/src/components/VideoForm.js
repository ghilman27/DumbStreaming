import React, { useState } from 'react';
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

const VideoForm = (props) => {
    const classes = useStyles();

    // Props
    const { categories, handleVideosChange, isEdit, isAdd, video } = props.location;

    // Set Initial State
    let initialAttributes
    if (isAdd) {
        initialAttributes = {
            category_id: 1,
            title: '',
            attache: '',
            thumbnail: ''
        }
    }
    if (isEdit) {
        initialAttributes = {
            category_id: video.category_id,
            title: video.title,
            attache: video.attache,
            thumbnail: video.thumbnail
        }
    }
    const [attributes, setAttributes] = useState(initialAttributes)

    // Define Attribute Change
    const handleAttributeChange = (event) => {
        event.persist();
        setAttributes(prevState => ({
            ...prevState,
            [event.target.name]: parseInt(event.target.value)
        }
        ))
    }

    // Choosing the right handler between edit or add video
    const handleAddSubmit = async (event) => {
        event.preventDefault();
        await API.addVideo(attributes);
        alert(`Video titled: [${attributes.title}] has been added`)
        setAttributes(initialAttributes);
        await handleVideosChange();
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        await API.editVideo(attributes, video.id);
        alert(`Video has been edited, Browse video to see the changes`)
        await handleVideosChange();
    }

    let handleSubmit
    if (isAdd) {
        handleSubmit = handleAddSubmit;
    }
    if (isEdit) {
        handleSubmit = handleEditSubmit;
    }

    // Rendering
    if (!categories) return <div>Loading .....</div>;
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {isAdd ? 'Hi! What kind of video you want to add?' : ''}
                    {isEdit ? 'Hi! Enter attributes you want to edit!' : ''}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required={isAdd}
                            fullWidth
                            id="title"
                            label="Video Title"
                            name="title"
                            autoComplete="title"
                            value={attributes.title}
                            onInput={handleAttributeChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup 
                            aria-label="category_id" 
                            name="category_id" 
                            value={attributes.category_id} 
                            onChange={handleAttributeChange}
                            > 
                                {
                                categories.map((category) => (
                                    <FormControlLabel 
                                    key={category.id} 
                                    value={category.id} 
                                    checked={attributes.category_id === category.id} 
                                    control={<Radio />} 
                                    label={category.name} 
                                    />
                                ))
                                }
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required={isAdd}
                            fullWidth
                            name="attache"
                            label="Attache"
                            type="attache"
                            id="attache"
                            autoComplete="attache"
                            value={attributes.attache}
                            onInput={handleAttributeChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required={isAdd}
                            fullWidth
                            name="thumbnail"
                            label="Youtube Embedded Url"
                            type="thumbnail"
                            id="thumbnail"
                            autoComplete="thumbnail"
                            value={attributes.thumbnail}
                            onInput={handleAttributeChange}
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
                    {isAdd ? 'Add Video' : ''}
                    {isEdit ? 'Edit Video' : ''}
                    </Button>
                </form>
            </div>
      </Container>
    )
}


export default VideoForm;