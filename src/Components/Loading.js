import React from 'react';
import ReactLoading from 'react-loading';
import '../Loading.css'

const Loading = () => (
    <ReactLoading id='load' type='bars' color='green' height={'20%'} width={'20%'} />
);

export default Loading;