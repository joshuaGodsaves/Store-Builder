import React from "react";

let context= React.createContext({
    store: {
        id: undefined,
        token: undefined
    }
});

export default  context;

export const StoreContext=  context