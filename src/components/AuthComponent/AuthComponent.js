import React, { cloneElement, Children } from 'react';
import Wrapper from './Wrapper';

export default function AuthComponent({isAuth = false, type = 'inline', children, ...props}) {
  return isAuth ? cloneElement(Children.only(children), {...props}) : <Wrapper type={type}>{children}</Wrapper>;
}
