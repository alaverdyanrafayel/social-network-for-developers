import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    name,
    value,
    onChange,
    error,
    info,
    options
}) => {
    const selectOption = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
  return (
    <div className="form-group">
        <select 
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
            name={name}
            value={value}
            onChange={onChange}
        >
            {selectOption}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && (
        <div className="invalid-feedback">
            {error}
        </div>
        )}
    </div>
  )
}

SelectListGroup.prototypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SelectListGroup;
