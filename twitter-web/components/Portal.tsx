import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

interface IProps {
  selector: string
}

const Portal: React.FC<IProps> = ({...props}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, []);
  return mounted ? createPortal(props.children, document.querySelector(props.selector)!!) : null
};

export default Portal;
