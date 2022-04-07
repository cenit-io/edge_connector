import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';

export const getSession = () => {
    const currentTenant = sessionStorage.getItem('currentTenant');
    return currentTenant ? JSON.parse(currentTenant) : null;
};

export const setSession = tenant => {
    const currentTenant = {
        secret: tenant.secret,
        token: tenant.token,
        tenantId: tenant.id,
        name: tenant.name,
        role: tenant.name.match(/[.@]myshopify\.com$/) ? 1 : 255
    };
    sessionStorage.setItem('currentTenant', JSON.stringify(currentTenant));
};


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const getAuth = async (code) => {
    const authInfo = getSession();
    if (code && !authInfo) {
        const res = await fetch(`${process.env.REACT_APP_ECAPI_URL}/get_access_token`, {
            body: JSON.stringify({
                code
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        return await res.json();
    } else {
        if (authInfo) {
            return { data: authInfo };
        }
        return null;
    }
}

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const query = useQuery();
    const [authInfo, setAuthInfo] = useState();

    const signIn = () =>
        window.location.replace(`${process.env.REACT_APP_ECAPI_URL}/sign_in/?redirect_uri=${process.env.REACT_APP_URL}`);

    const signOut = () => {
        sessionStorage.removeItem('currentTenant');
        window.location.replace(`${process.env.REACT_APP_ECAPI_URL}/sign_out?redirect_uri=${process.env.REACT_APP_URL}`);
    };

    useEffect(() => {
        async function fetchAuth() {
            const res = await getAuth(query.get('code'));
            if (res) {
                setAuthInfo(res.data)
                setSession(res.data)
            }
        }
        fetchAuth();
    }, [query]);

    return {
        authInfo,
        signIn,
        signOut
    };
}
