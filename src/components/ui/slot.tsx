import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';

type SlottableElement = React.ReactElement<Record<string, unknown>>;

function Slot({
  children,
  ...props
}: Record<string, unknown> & { children?: React.ReactNode }) {
  if (!React.isValidElement(children)) {
    return null;
  }

  const child = children as SlottableElement;

  return React.cloneElement(child, mergeProps(props, child.props));
}

export { Slot };
