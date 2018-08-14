import { 
    LOGIN_USER, GET_ALL_USERS, REGISTER_USER, GET_ALL_ROUTES, GET_ROUTE,
    CLEAR_ACTIVE_ROUTE, ADD_ROUTE, EDIT_ROUTE
} from '../actions/actionTypes';
  
const initialState = {
    routes: [],
    loginUser: null,
    users: [],
    activeRoute: {}
}

export function test(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginUser: action.payload }
        case GET_ALL_USERS:
            return { ...state, users: action.payload }
        case REGISTER_USER:
            return { ...state, users: state.users.concat(action.payload) }
        case GET_ALL_ROUTES:
            return { ...state, routes: action.payload }
        case GET_ROUTE:
            let route;
            state.routes.map((item, i) => {
                if(item.id === action.id){
                    route = item;
                }
            })
            return { ...state, activeRoute: route || action.payload }
        case CLEAR_ACTIVE_ROUTE:
            return { ...state, activeRoute: {}}
        case ADD_ROUTE:
            return { ...state, routes: state.routes.concat(action.payload) }
        case EDIT_ROUTE:
            let newRoutes = [];
            state.routes.map((item, i) => {
                if(item.id === action.payload.id) {
                    newRoutes[i] = action.payload;
                } else {
                    newRoutes[i] = item;
                }
            })
            return { ...state, routes: newRoutes  }
        default:
            return state;
    }
}