import * as actionTypes from './Actions';
const initialState = {
    users : []
};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_USERS : 
            return {
                users : [...state.users,...action.user]
            };
        case actionTypes.DELETE_USER : 
            const updatedUsers = state.users.filter((user) => user.login_uuid !== action.uuid)
            return {
                users : updatedUsers
            };
        case actionTypes.DELETE_ALLUSERS : 
            return {
                users : []
            };
        default :
            return state;
    }

}

export default reducer;