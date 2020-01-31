import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
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
  const differenceTotal = endDate.getTime() - startDate.getTime();
  const differenceActual = new Date().getTime() - startDate.getTime();
  const normalizedValue = (differenceActual * 100) / differenceTotal;
  return normalizedValue;
};

const MyBookProgress = ({ classes, booking }) => {
  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const [extending, setExtending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    getDifferenceInMinutes(endDate, new Date())
  );
  const onClick = () => {
    setExtending(true);
  };
  useEffect(() => {
    setTimeLeft(getDifferenceInMinutes(endDate, new Date()));
  }, []);
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
              <ButtonField
                variant='contained'
                type='button'
                color='primary'
                disabled={extending}
                loading={extending}
                onClick={onClick}
              >
                +15 minutes
              </ButtonField>
            </div>
          )}
          {endDate && <span>{parseTime(endDate)}</span>}
        </div>
      </div>
    </div>
  );
};

MyBookProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  booking: PropTypes.object,
};

MyBookProgress.defaultProps = {
  booking: {},
};

export default withStyles(styles)(MyBookProgress);
