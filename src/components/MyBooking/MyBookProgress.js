import React, { useState } from 'react';
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

const MyBookProgress = ({ classes, startDate, endDate }) => {
  const [extending, setExtending] = useState(false);

  const onClick = () => {
    setExtending(true);
  };
  return (
    <div className={classes.container}>
      <div className={classes.background}>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={getPercentComplete(startDate, endDate)}
        />
        <div className={classes.values}>
          <span>{parseTime(startDate)}</span>
          <div className={classes.infoContainer}>
            <span>
              {`You have ${getDifferenceInMinutes(
                new Date(),
                endDate
              )} minutes left`}
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
          <span>{parseTime(endDate)}</span>
        </div>
      </div>
    </div>
  );
};

MyBookProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

MyBookProgress.defaultProps = {
  startDate: undefined,
  endDate: undefined,
};

export default withStyles(styles)(MyBookProgress);
