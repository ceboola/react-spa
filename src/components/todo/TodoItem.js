import React from 'react';
import {partial} from '../../lib/utils'
import FontAwesome from 'react-fontawesome';


export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>
    <span className="deleted"><a href="#" onClick={handleRemove}><FontAwesome name='close' /></a></span>
    <label htmlFor={props.id}></label>
      <input type="checkbox" className="option-input checkbox" id={props.id} onChange={handleToggle}
       checked={props.isComplete} /> {props.name}
    </li>
  )
}

TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
