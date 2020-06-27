import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function WorkTrackingNight({userData}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ชื่อ - นามสกุล</TableCell>
            <TableCell align="right">สถานะ</TableCell>
            <TableCell align="right">เข้างาน</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">เลิกงาน</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">ระยะเวลา</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row, i) => (
            row.map((e) => (
              e?.value?.work_list === "Late night" ? <TableRow key={e.key} style={{backgroundColor: e?.value?.check_night_late > 0 ? '#FFC107' : i%2 === 1 ? '#FFF' : '#eee'}}>
                
              <TableCell component="th" scope="row">
                  {e.firstname}  {e.lastname}
                </TableCell>
                <TableCell align="center">{e.role}</TableCell>
                <TableCell align="right">{moment(e?.value?.check_in).format('L HH:mm')}</TableCell>
                <TableCell align="center"><img src={e?.value?.check_in_photo} width="200px" alt=''/></TableCell>
                <TableCell align="right">{e?.value?.check_out && moment(e?.value?.check_out).format('L HH:mm')}</TableCell>
                <TableCell align="center"><img src={e?.value?.check_out_photo} width="200px" alt=''/></TableCell>
                <TableCell align="right">{e?.value?.check_out && moment(e?.value?.check_out).diff(moment(e?.value?.check_in), 'hours') + ' ชั่วโมง'} </TableCell>
              </TableRow> : ''
            ))
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
