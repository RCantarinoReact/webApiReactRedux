const initialState = {
    contacts: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestRelatory: () => async (dispatch, getState) => {
        const url = 'api/Relatorio/Contatos'
        const response = await fetch(url);
        const rels = await response.json();
        dispatch({ type: 'FETCH_REL', rels });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_REL': {
            return {
                ...state,
                contacts: action.rels,
                loading: false,
                errors: {},
                forceReload: false
            }
        }

        default:
            return state;
    }
};