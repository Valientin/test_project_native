import { GET_ALL_USERS, REGISTER_USER, GET_ALL_ROUTES, GET_ROUTE, ADD_ROUTE, EDIT_ROUTE } from './actionTypes';

export async function getAllUsers() {
    let user = await fetch(
        `https://my-json-server.typicode.com/Valientin/test-project_server/users`
    );
    let userJson = await user.json();

    return {
        type: GET_ALL_USERS,
        payload: userJson
    }
}

export async function registerUser(obj) {
    await fetch(
        'https://my-json-server.typicode.com/Valientin/test-project_server/users',
        {
            method: 'POST',
            body: JSON.stringify(obj)
        }
    ).then(res => res.json())
    .catch(err => console.log(err.message))

    return {
        type: REGISTER_USER,
        payload: obj
    }
}

export async function getAllRoutes() {
    let response = await fetch(
        'https://my-json-server.typicode.com/Valientin/test-project_server/routes'
    );
    let responseJson = await response.json();

    return {
        type: GET_ALL_ROUTES,
        payload: responseJson
    }
}

export async function getRoute(itemId) {

    let response = await fetch(
        `https://my-json-server.typicode.com/Valientin/test-project_server/routes/${itemId}`
    );
    let responseJson = await response.json();
    return {
        type: GET_ROUTE,
        id: itemId,
        payload: responseJson
    }
}

export async function addRoute(obj) {
    await fetch(
        'https://my-json-server.typicode.com/Valientin/test-project_server/routes',
        {
            method: 'POST',
            body: JSON.stringify(obj)
        }
    ).then(res => res.json())
    .catch(err => console.log(err.message))

    return {
        type: ADD_ROUTE,
        payload: obj
    }
}

export async function editRoute(obj) {
    await fetch(
        `https://my-json-server.typicode.com/Valientin/test-project_server/routes/${obj.id}`,
        {
            method: 'PUT',
            body: JSON.stringify(obj)
        }
    ).then(res => res.json())
    .catch(err => console.log(err.message))

    return {
        type: EDIT_ROUTE,
        payload: obj
    }
}