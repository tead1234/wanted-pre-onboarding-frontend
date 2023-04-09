import { observable } from 'mobx';

const ModifyIdStore = observable({
    // state
    id: 0,

    // action
    modifyAction(id) {
        this.id = id;
    },
    
    clearAction() {
        this.id = "";
    }
});

export default ModifyIdStore;