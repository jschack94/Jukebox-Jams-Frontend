import React from 'react';
import ReactLoading from 'react-loading';
import '../Loading.css'

const Loading = () => (
    <ReactLoading id='load' type='bars' color='black' height={'50%'} width={'1-%'} />
);

export default Loading;