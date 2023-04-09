import { observable } from 'mobx';

const ModifyModeStore = observable({
    // state
    
    modify : false,
    // action
    activeAction() {
        this.modify = true;
    },
    
    deactiveAction() {
        this.modify = false;
    }
});

export default ModifyModeStore;