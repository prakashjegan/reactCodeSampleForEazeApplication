import Duck from 'extensible-duck'

export default function createDuck({
    namespace,
    store,
    fetchCallback,
    selectors
}) {
    return new Duck({
        namespace,
        store,
        types: [
            'ERROR', 'REQUEST',  'RECEIVE',
            'ADD',  'INVALIDATE',   'END', 'DONE'
          ],
        initialState: {
            isFetching: false,
            didInvalidate:true,
            payload: null,
            end:false,
            error: null,
        },
        reducer: (state, action, duck) => {
            console.log('Message Reducer')
            switch(action.type) {
                case duck.types.INVALIDATE: 
                    return { ...state, didInvalidate: true, payload: null}
                case duck.types.END:
                    return { ...state, end: true}
                case duck.types.ERROR:
                    return {
                        ...state,
                        isFetching: false,
                        didInvalidate: false,
                        error: action.error,
                        ...(!action.error.keeyPayload && { payload: null} ),
                    }
                case duck.types.REQUEST:
                    return { ...state, isFetching:true, didInvalidate: false}
                case duck.types.RECEIVE:
                    return {
                        ...state,
                        isFetching: false,
                        didInvalidate: false,
                        payload: action.payload,
                        end: action.payload ? action.payload.length === 0 : true,
                        error: null
                    }
                case duck.types.DONE:
                    return { ...state, isFetching: false}
                default: return state
            }
        } ,
        selectors: selectors || null,
        creators: (duck) => ({
            invalidate: () => ({type: duck.types.INVALIDATE}),
            end: () => ({type: duck.types.END}),
            request: () => ({type: duck.types.REQUEST}),
            receive: (json) => ({
                type: duck.types.RECEIVE,
                payload: json,
                receiveedAt: Date.now()
            }),
            error: (error, keeyPayload =false) =>  ({
                type: duck.types.ERROR,
                error: {...error, keeyPayload}
            }),
            shouldFetch: (state) => {
                if(state[store].isFetching) return false
                return state[store].didInvalidate
            },
            get: (param) => (dispatch, getState) => {
                if(duck.creators.shouldFetch(getState()) || param?.ignoreCache){
                    return dispatch(duck.creators.fetch(param))
                }
                return Promise.resolve()
            },
            fetch: (param) => (dispatch) => {
                console.log('Into fetch deck' , param , duck.creators.request())
                dispatch(duck.creators.request())
                return fetchCallback(param)
                .then((data) => {
                    if(typeof data.ok !== 'undefined' && !data.ok) {
                        dispatch(duck.creators.error(data, param.keeyPayload))
                    } else dispatch(duck.creators.receive(data))
                    return data
                })
                .catch((error) => {
                    dispatch(duck.creators.error(error, param?.keeyPayload))
                })
            },
            done: () => ({type: duck.types.DONE})
        })
    })
}