import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // used when we want to interact a componenet with the redux store, i.e. to dispatch an action or to get some state from the store
// or we want to get the state from the store and use it in the component

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 && (
    <div className='alert-wrapper'>
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          {alert.msg}
        </div>
      ))}
    </div>
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
