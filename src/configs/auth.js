export const TOKEN_KEY
="eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";


export var autenticado = () => {
    if(localStorage.getItem(TOKEN_KEY)){
        return true
    }else{
        return false
    }
};

export const getToken = () =>{
    return localStorage.getItem(TOKEN_KEY);
};

export const login =(token) => { 
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => { 
    localStorage.removeItem(TOKEN_KEY);
};