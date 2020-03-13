import * as types from './mutation-type.js';

export default {
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.SET_AGE](state, age) {
        state.age = age;
    },
    [types.SET_TASKNAME](state, taskName) {
        state.taskName = taskName;
    },
    [types.SET_BACKBRANCH](state, backBranch) {
        state.backBranch = backBranch;
    }
};