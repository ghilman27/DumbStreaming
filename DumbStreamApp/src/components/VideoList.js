import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit, Delete } from '@material-ui/icons';
import {
  NavLink,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
      padding: theme.spacing(1.25),
      '&:last-child': {
        paddingBottom: theme.spacing(1.25),
      },
    },
    videoTitle: {
      fontWeight: '600'
    },
    menuButton: {
      color: '#1976d2'
    }
}));


const VideoList = ( { videos } ) => {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item key={video.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  component='iframe'
                  title={video.title}
                  src={video.thumbnail}
                />
                <CardContent className={classes.cardContent}>
                  <Typography noWrap gutterBottom className={classes.videoTitle}>
                    {video.title}
                  </Typography>
                  <Typography noWrap variant="subtitle2">
                    Category: {video.category ? video.category.name : 'Unknown'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <NavLink exact={true} to='/editvideo'>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <Edit />
                    </IconButton>
                  </NavLink>
                  <NavLink exact={true} to='/editvideo'>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <Delete />
                    </IconButton>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
}

export default VideoList;