"use strict";

const rule = {
    name: 'no_this_arg',
    desc: { cn: '在函数中要引用自身时使用self，不要使用自定义的this参数',
        en: 'Do not use [this] arg while refering to self, use [self:] instead' },
    tags: ['intermediate'],
    document: 103,
    check: function (document) {
        let retRange;
        let ast = document.ast;
        if (ast) {
            let funcs = ast.select(function (node) {
                let func = node.anyNode().asFunctionBody();
                if (!func) {
                    return false;
                }
                let args = func.getArguments();
                if (args.length == 0) {
                    return false;
                }
                let firstName = args[0];
                if (firstName.getText() == 'this') {
                    retRange = firstName.getRange();
                    return true;
                }
                return false;
            }, 1);
            if (funcs.length > 0) {
                return [{
                        range: retRange,
                        severity: 2
                    }];
            }
        }
        return [];
    }
};
return rule;
//2.3.3