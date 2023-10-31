import React, { useState } from "react";
import AppContext from './AppContext';
import propTypes from 'prop-types'

function Provider({ children }) {

    const [conta, setConta] = useState({});
    const [id, setId] = useState();
    const [serviceToEdit, setServiceToEdit] = useState({})
    const value = {
        conta,
        setConta,
        id,
        setId,
        serviceToEdit,
        setServiceToEdit,
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