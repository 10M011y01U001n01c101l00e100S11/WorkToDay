import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

export default function AddUsersAppBar() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then((e) => e.json())
      .then((e) => e.ip)
  })
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h5" noWrap>
            Check In/Out
          </Typography>

          <IconButton aria-label="search" color="inherit" onClick={()=>history.push('')}>
            <HomeIcon />
          </IconButton>

          <IconButton aria-label="search" color="inherit" onClick={() => {localStorage.clear();history.push('login')}}>
            <ExitToAppIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </div>
  );
}