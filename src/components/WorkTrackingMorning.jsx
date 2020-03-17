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
import 'moment/locale/th'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function WorkTrackingMorning({ userData }) {
  const classes = useStyles();
  console.log(userData);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ชื่อ - นามสกุล</TableCell>
            <TableCell align="right">สถานะ</TableCell>
            <TableCell align="right">เข้างาน</TableCell>
            <TableCell align="right">เลิกงาน</TableCell>
            <TableCell align="right">ระยะเวลา</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map(row => (
            row.map((e, i) => (
              e?.value?.work_list === "Morning job" ? <TableRow key={e.i}>
                <TableCell component="th" scope="row">
                  {e.fristname}  {e.lastname}
                </TableCell>
                <TableCell align="right">{e.role}</TableCell>
                <TableCell align="right">{moment(e?.value?.check_in).format('L HH:mm')}</TableCell>
                <TableCell align="right">{e?.value?.check_out && moment(e?.value?.check_out).format('L HH:mm')}</TableCell>
                <TableCell align="right">{e?.value?.check_out && moment(e?.value?.check_out).diff(moment(e?.value?.check_in), 'hours') + ' ชั่วโมง'}</TableCell>
              </TableRow> : ''
            ))
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
