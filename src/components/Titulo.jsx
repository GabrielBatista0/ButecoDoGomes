import React, { Component } from 'react';

const Titulo = ({corfont,nome}) => {
    return ( 
        <>
            <h2 className={`text-${corfont} font-kadwa text-3xl ml-8 text-left`}>{nome}</h2>
        </>
     );
}
 
export default Titulo;