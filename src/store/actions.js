import * as types from './mutation-type.js';
import { backBranch } from './getters.js';

export default {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
        commit(types.SET_TASKNAME, taskName);
        commit(types.SET_BACKBRANCH, backBranch);
    }
};