import React, { useState, useEffect } from 'react';
import { VideoList, AddVideo, AddCategory, EditVideo } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import API from './api';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#dd403f',
    color: 'white',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: 'white',
  },
  icon: {
    float: 'left',
  }
}));

const App = () => {
  const classes = useStyles();

  const [videos, setVideos] = useState();

  useEffect(() => {
    const getVideos = async () => {
      const videos = await API.getVideos();
      setVideos(videos);
    };

    getVideos();
  }, []);
  
  if (!videos) return <div>Loading .....</div>;

  return (
    <Router>
      <div className="App">
        <AppBar position="relative" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Dumb Stream
            </Typography>
            <NavLink exact={true} to='/'>
              <Button href="#" color="inherit" variant="outlined" className={classes.link}>
                Browse Video
              </Button>
            </NavLink>
            <NavLink exact={true} to='/addvideo'>
              <Button href="#" color="inherit" variant="outlined" className={classes.link}>
                Add Video
              </Button>
            </NavLink>
            <NavLink exact={true} to='/addcategory'>
              <Button href="#" color="inherit" variant="outlined" className={classes.link}>
                Add Category
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'>
            <VideoList videos={videos} />
          </Route>
          <Route exact path='/addvideo'>
            <AddVideo />
          </Route>
          <Route exact path='/addcategory'>
            <AddCategory />
          </Route>
          <Route exact path='/editvideo'>
            <EditVideo />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
