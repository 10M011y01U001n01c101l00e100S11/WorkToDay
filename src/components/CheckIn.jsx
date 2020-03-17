
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import moment from "moment";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        paddingBottom: '50px'
    },
}));
export default function CheckIn({ CheckInData }) {
    const classes = useStyles();
    document.title = 'Work To Day | Users';
    return (
        <List className={classes.root}>
            {CheckInData?.map(({ _key, check_in, check_out, check_user, work_list }) => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText style={{ minWidth: 'fit-content' }} primary={"Time's " + moment(check_in).toNow()} secondary={<>Check In At: {moment(check_in).format('LL HH:mm:ss')}<br />
                    Check Out At: {moment(check_out).format('LL HH:mm:ss').replace('Invalid date', '-')}<br/>
                    Time's {moment(check_out).diff(moment(check_in), 'hour') || '00'}:{moment(check_out).diff(moment(check_in), 'minute') || '00'}:{moment(check_out).diff(moment(check_in), 'second') || '00'}
                    </>} />
                </ListItem>
            ))}
        </List>
    );
}
