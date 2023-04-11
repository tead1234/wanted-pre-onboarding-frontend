import { observable } from 'mobx';

const ModifyIdStore = observable({
    // state
    id: 0,
    isChecked : false,
    // action
    modifyAction(id) {
        this.id = id;
    },
    
    clearAction() {
        this.id = "";
        this.isChecked = false;
    },
    modifyCheckAction(check) {
        this.isChecked = check;
    }
});

export default ModifyIdStore;