import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';


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

const EditVideo = () => {
    const classes = useStyles();
    // const [title, category_id, attache, thumbnail] = useState({ title })
    const [attributes, setAttributes] = useState({
        category_id: 1,
        title: '',
        attache: '',
        thumbnail: ''
    })

    const handleCategoryChange = (event) => {
        setAttributes({
            category_id: event.target.value
        })
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Enter attributes you want to edit
                </Typography>

                <form className={classes.form} noValidate>
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup aria-label="attributes" name="attributes1" value={attributes.category_id} onChange={handleCategoryChange}> 
                                <FormControlLabel value={1} checked={attributes.category_id == 1} control={<Radio />} label="Comedy" />
                                <FormControlLabel value={2} checked={attributes.category_id == 2} control={<Radio />} label="Music" />
                                <FormControlLabel value={3} checked={attributes.category_id == 3} control={<Radio />} label="Horror" />
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="thumbnail"
                            label="Thumbnail"
                            type="thumbnail"
                            id="thumbnail"
                            autoComplete="thumbnail"
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
                    Edit Video
                    </Button>
                </form>
            </div>
      </Container>
    )
}


export default EditVideo;