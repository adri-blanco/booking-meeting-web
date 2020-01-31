import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AvailabilityMarker from './AvailabilityMarker';

const styles = {
  container: {
    height: '100%',
    margin: '16px',
    display: 'flex',
    flexFlow: 'column',
  },
  smallCell: {
    width: '10px',
  },
};

const RoomsAvailability = ({ classes }) => {
  const rooms = useSelector(state => state.rooms.rooms);
  return (
    <div className={classes.container}>
      <TableContainer>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.smallCell} alt='Availability' />
              <TableCell>Name</TableCell>
              <TableCell>Floor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.smallCell}>
                  <AvailabilityMarker
                    availability={row.isAvailable}
                    owner={row.owner}
                    time={row.time}
                    name={row.meetingName}
                  />
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell>{row.floor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

RoomsAvailability.propTypes = {
  classes: PropTypes.object.isRequired,
};

RoomsAvailability.defaultProps = {};

export default withStyles(styles)(RoomsAvailability);
