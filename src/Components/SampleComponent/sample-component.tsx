import './sample-component.scss';

import React, { ReactElement } from 'react';

interface Props {
  children?: ReactElement
}

export default function sampleComponent({ children }:Props) {
    return <span className="sample-component">{children}</span>;
}
