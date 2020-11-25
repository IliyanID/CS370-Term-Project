import React from 'react';

const authContext = React.createContext({
    authenticated:false,
    updateCred:() => {},
    authenticateUser:() => {}
});
    


export default authContext;