import { createAction, handleActions } from 'redux-actions'

const INCREASE = 'counter_INCREASE'
const DECREASE = 'counter_DECREASE'

// export const increase = () => {
//     return {type : INCREASE}
// }

// export const decrease = () => {
//     return {type : DECREASE}
// }

// export function addTodo(text) {
//     return  {
//       type: ADD_TODO,
//       text
//     }
//   }

//   export function toggleTodo(index) {
//     return {
//       type: TOGGLE_TODO,
//       index
//     }
//   }

export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)
//  export const changeInput = createAction(CHANGE_INPUT, input => input)

const initialState = {
  number: 0
}

// function counter(state = initialState, action) {
//     switch (action.type) {
//         case INCREASE:
//             return {
//                 number: state.number + 1
//             }
//         case DECREASE:
//             return {
//                 number: state.number - 1
//             }
//         default:
//             return state
//     }
// }

const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({
      number: state.number + 1
    }),
    [DECREASE]: (state, action) => ({
      number: state.number - 1
    })
    //  [CHANGE_INPUT]: (state, {payload: input}) => ({
    // ...state,
    // input: input
    // })
  },
  initialState
)

export default counter
