export const name = (state) => {
    return state.name;
}

export const age = (state) => {
    return state.age
}

export const taskName = (state) => {
    return state.taskName
}

export const backBranch = (state) => {
    return state.backBranch
}
export const other = (state) => {
    return `My name is ${state.name}, I am ${state.age}.`;
}