import axios from "axios";

const client = axios.create({baseURL: "http://localhost:8000"});


export const register = async (params) => { await client.post("/users/register", params)};

export const login = async (params) => {
  return await client.post('users/login', params);
};

export const indexUsers = async () => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    const { data } = await client.get("/users", {
        headers: {'x-access-token': token}
        });
    // console.log(data);
    return data;

}


export const logout = () => {
  window.localStorage.removeItem('auth');

};




export const indexNotes = async () => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    const {data} = await client.get('/notes', {
    headers: {'x-access-token': token}
    });
    console.log(data);
    return data;
}

export const indexTrash = async () => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    const {data} = await client.get('/notes/trash', {
    headers: {'x-access-token': token}
    });
    console.log(data);
    return data;
}

export const indexShared = async () => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    const {data} = await client.get('/notes/shared-with-me', {
    headers: {'x-access-token': token}
    });
    console.log(data);
    return data;
}


export const createNote = async () => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    const {data} = await client.post('/notes', {'title': 'New Note', 'body': ''}, {
    headers: {'x-access-token': token}
    });
    return data;
}


export const deleteNote = async (id) => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    await client.delete(`/notes/${id}`,
    { headers: {'x-access-token': token}
});
}

export const shareNote = async (params) => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    client.put('/notes/share-note', params, {
    headers: {'x-access-token': token}
});
}

export const updateNote = async (id, params) => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    client.put(`/notes/${id}`, params, {
    headers: {'x-access-token': token}
});
}


export const searchNote = async (query) => {
    let token;
    let auth = JSON.parse(localStorage.getItem('auth')) || null ;
    token = auth.token;
    await client.get(`/notes/search?query=${query}`, {
    headers: {'x-access-token': token}
});
}
