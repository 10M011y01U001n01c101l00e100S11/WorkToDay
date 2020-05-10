import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import WorkTrackingMorning from './WorkTrackingMorning';
import WorkTrackingNight from './WorkTrackingNight';
import WorkTrackingAfternoon from './WorkTrackingAfternoon';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function WorkTrackingTab({userData}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//   userData.sort(function (a, b) {
//       console.log(a);
      
//     if (a.e?.value?.check_in > b.e?.value?.check_in) {
//         return -1;
//     }
//     if (b.e?.value?.check_in > a.e?.value?.check_in) {
//         return 1;
//     }
//     return 0;
//   })
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Morning Shift" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Afternoon Shift" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Night Shift" href="/trash" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <WorkTrackingMorning userData={userData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WorkTrackingAfternoon userData={userData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WorkTrackingNight userData={userData} />
      </TabPanel>
    </div>
  );
}
