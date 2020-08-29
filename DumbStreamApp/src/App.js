import React, { useState, useEffect } from 'react';
import { VideoList, VideoForm, CategoryForm} from './components';
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


const getVideos = async () => {
  return await API.getVideos();
};

const getCategories = async () => {
  return await API.getCategories();
}


const App = () => {
  const classes = useStyles();

  // states
  const [videos, setVideos] = useState();
  const [categories, setCategories] = useState();

  const handleVideosChange = async () => {
    const videos = await getVideos();
    setVideos(videos);
  }

  const handleCategoriesChange = async () => {
    const categories = await getCategories();
    setCategories(categories);
  }

  // componentDidMount
  useEffect(async () => {
    await handleVideosChange();
    await handleCategoriesChange();
  }, []);

  if (!videos || !categories) return <div>Loading .....</div>;

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
            <NavLink exact={true} to={{
                    pathname: `/addvideo`,
                    categories: categories,
                    isAdd: true,
                    handleVideosChange: handleVideosChange
            }}>
              <Button href="#" color="inherit" variant="outlined" className={classes.link}>
                Add Video
              </Button>
            </NavLink>
            <NavLink exact={true} to='/addcategory'>
              <Button href="#" color="inherit" variant="outlined" className={classes.link}>
                Edit Category
              </Button>
            </NavLink>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path='/'>
            <VideoList 
              videos={videos} 
              categories={categories}
              handleVideosChange={handleVideosChange}
            />
          </Route>

          <Route exact path='/addcategory'>
            <CategoryForm 
              categories={categories}
              handleCategoriesChange={handleCategoriesChange}
              handleVideosChange={handleVideosChange}
            />
          </Route>
          
          <Route exact path='/addvideo' component={VideoForm} />
          <Route exact path='/editvideo/:id' component={VideoForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
