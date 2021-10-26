export const TOKEN_KEY
="eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";


export var autenticado = () => {
    if(localStorage.getItem(TOKEN_KEY)){
        return true
    }else{
        return false
    }
};  // verifica se está auth

export const getToken = () =>{  // retorna o token
    localStorage.getItem(TOKEN_KEY);
};

export const login =(token) => {  // efetua o login criando um token
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {  // remove o token 
    localStorage.removeItem(TOKEN_KEY);
};