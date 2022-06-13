"use strict";
const rule = {
    name: 'type_cast',
    desc: { cn: '在语句的开头，利用内置函数进行类型转换 (tostring, tonumber, etc.)',
        en: 'Use integrated functions to execute type cast at the beginning of a statement (tostring, tonumber, etc.).' },
    tags: ['advance'],
    document: 132,
    check: function (document) {
        let nodes = document.ast.select(function (node) {
            let BOP = node.anyNode().asBOP();
            if (!BOP) {
                return false;
            }
            let left = BOP.getLeft();
            let rights = BOP.getRights();
            let leftType = left.getType();
            if((leftType !== 'number')||(left.getType() !== 'string')){
                return false;
            }
            for (let _i = 0, rights_1 = rights; _i < rights_1.length; _i++) {
                let right = rights_1[_i];
                if (leftType != right.exp.getType()) {
                    let text = BOP.getText();
                    if (text.indexOf('tostring') != -1 || text.indexOf('tonumber') != -1) {
                        return false;
                    }
                    return true;
                }
            }
            return false;
        }, 1);
        if (nodes.length > 0) {
            return [{
                    range: nodes[0].getRange(),
                    severity: 2
                }];
        }
        return [];
    }
};
return rule;
//2.12