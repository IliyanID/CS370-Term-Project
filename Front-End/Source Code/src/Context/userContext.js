import React from 'react';

const userContext = React.createContext({
    logout:() => {},
    itemTab: () => {},
    updateSearch: () => {},
    tabs: {},
    currentSearch: [""]
});
    


export default userContext;