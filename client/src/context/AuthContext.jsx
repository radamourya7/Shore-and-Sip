import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('adminUser');
        if (stored) setAdmin(JSON.parse(stored));
    }, []);

    const loginAdmin = (userData) => {
        setAdmin(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        localStorage.setItem('adminToken', userData.token);
    };

    const logoutAdmin = () => {
        setAdmin(null);
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
    };

    return (
        <AuthContext.Provider value={{ admin, loginAdmin, logoutAdmin, isAdmin: admin?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
