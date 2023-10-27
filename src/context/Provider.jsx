import React, { useState } from "react";
import AppContext from './AppContext';
import propTypes from 'prop-types'

function Provider({ children }) {

    const [conta, setConta] = useState({});
    const [id, setId] = useState();
    const value = {
        conta,
        setConta,
        id,
        setId,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default Provider;

Provider.propTypes = {
    children: propTypes.any,
}.isRequired;