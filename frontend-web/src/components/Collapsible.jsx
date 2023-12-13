/* React imports */
import { useState } from 'react';
/* Utilities imports */
import PropTypes from 'prop-types';

export default function Collapsible({title="Collapsible", children}) {
  Collapsible.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  }

  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen(!open)
  }

  return(
    <>
      <div onClick={toggle} className='CollapsibleHead'>{title}</div>
      {open &&
        <div className="toggle">{children}</div>
      }
    </>
  )

}