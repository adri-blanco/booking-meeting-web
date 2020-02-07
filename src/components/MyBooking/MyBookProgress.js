import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useDispatch } from 'react-redux';
import { lighten, withStyles } from '@material-ui/core/styles';
import { parseTime, getDifferenceInMinutes } from '../../utils/date';
import ButtonField from '../../reusable-components/buttons/ButtonField';

const styles = {
  container: {
    borderRadius: '10px',
  },
  values: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '150px',
    padding: '8px',
  },
};

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#00a500', 0.6),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#00a500',
  },
})(LinearProgress);

const getPercentComplete = (startDate, endDate) => {
  const totalLength = endDate.getTime() - startDate.getTime();
  const lengthFromNow = new Date().getTime() - startDate.getTime();
  const normalizedValue = (lengthFromNow * 100) / totalLength;
  return normalizedValue;
};

const MyBookProgress = ({ classes, booking, roomId, onUpdate }) => {
  const dispatch = useDispatch();
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const [extending, setExtending] = useState(false);
  const [ending, setEnding] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    getDifferenceInMinutes(endDate, new Date())
  );
  const onExtend = async () => {
    setExtending(true);
    await dispatch.rooms.extendTime({
      bookingId: booking.bookingId,
      startHour: startDate.toISOString(),
      endHour: endDate.toISOString(),
      roomId,
    });
    onUpdate({ type: 'extend' });
    setExtending(false);
  };
  const onEnd = async () => {
    setEnding(true);
    await dispatch.rooms.endBooking({
      bookingId: booking.bookingId,
      startHour: startDate.toISOString(),
      endHour: endDate.toISOString(),
      roomId,
    });
    onUpdate({ type: 'end' });
    setEnding(false);
  };

  useEffect(() => {
    setTimeLeft(getDifferenceInMinutes(endDate, new Date()));
  }, [endDate]);
  return (
    <div className={classes.container}>
      <div className={classes.background}>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={
            startDate && endDate ? getPercentComplete(startDate, endDate) : 0
          }
        />
        <div className={classes.values}>
          {startDate && <span>{parseTime(startDate)}</span>}
          {endDate && (
            <div className={classes.infoContainer}>
              <span>
                {timeLeft > 0
                  ? `You have ${timeLeft} minutes left`
                  : 'This booking has expired'}
              </span>
            </div>
          )}
          {endDate && <span>{parseTime(endDate)}</span>}
        </div>
        <div className={classes.buttons}>
          <ButtonField
            variant='contained'
            type='button'
            color='primary'
            disabled={extending || ending}
            loading={extending}
            onClick={onExtend}
            className={classes.button}
          >
            +15 minutes
          </ButtonField>

          <ButtonField
            variant='contained'
            type='button'
            color='secondary'
            disabled={extending || ending}
            loading={ending}
            onClick={onEnd}
            className={classes.button}
          >
            End
          </ButtonField>
        </div>
      </div>
    </div>
  );
};

MyBookProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  booking: PropTypes.object,
  roomId: PropTypes.number,
  onUpdate: PropTypes.func,
};

MyBookProgress.defaultProps = {
  booking: {},
  roomId: '',
  onUpdate: () => {},
};

export default withStyles(styles)(MyBookProgress);
