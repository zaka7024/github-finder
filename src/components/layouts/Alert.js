import React from 'react';

const Alert = ({alert}) => (
    alert !== null && <div className={`slide-down alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'/> {alert.msg}
    </div>
);

export default Alert;
