const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (email, password) => {
    await delay(800); // Simulate network delay
    // Accept any email/password for demo purposes, or specific ones
    if (email && password) {
        // Mock successful response
        return {
            user: {
                id: '1',
                name: 'Admin User',
                email: email,
                avatar: `https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff`
            },
            token: 'mock-jwt-token-' + Date.now()
        };
    }
    throw new Error('Invalid credentials');
};

export const logout = async () => {
    await delay(500);
    return true;
};

export const getCurrentUser = async () => {
    await delay(500);
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};
