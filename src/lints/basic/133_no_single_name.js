"use strict";
const rule = {
    name: 'no_single_name',
    desc: { cn: '避免使用单字母来命名函数或变量，命名时遵从见文知意原则',
        en: 'Avoid using one single letter to name a letiable or function. Make sure the name has a clear meaning.' },
    tags: ['basic'],
    document: 133,
    check: function (document) {
        let names = document.ast.select(function (node) {
            let name = node.anyNode().asName();
            if (!name) {
                return false;
            }
            if (name.getParent().isNamedFunction()) {
                if (name.getText().length <= 1) {
                    return true;
                }
            }
            if (name.getParent().isAssign()) {
                if (name.getText().length <= 1) {
                    return true;
                }
            }
            if(name.getParent().isField()){
                if(name.getText().length<=1){
                    return true;
                }
            }
            return false;
        }, 1);
        if (names.length > 0) {
            let name_1 = names[0];
            return [{
                    range: name_1.getRange(),
                    severity: 2
                }];
        }
        return [];
    }
};
return rule;
//2.13.2