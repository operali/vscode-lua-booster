"use strict";

const rule = {
    name: 'no_arg_as_param',
    desc: { cn: '不要用arg作为参数名，在低版本 Lua 中arg作为参数对象存在。',
        en: 'Do not use [arg] as a parameter, as in low versions of lua it is used as parameter object.' },
    tags: ['intermediate'],
    document: 113,
    check: function (document) {
        let retRange;
        let nodes = document.ast.select(function (node) {
            let func = node.anyNode().asFunctionBody();
            if (!func) {
                return false;
            }
            let params = func.getArguments();
            for (let _i = 0, params_1 = params; _i < params_1.length; _i++) {
                let param = params_1[_i];
                if (param.getText() == "arg") {
                    retRange = param.getRange();
                    return true;
                }
            }
            return false;
        }, 1);
        if (nodes.length > 0) {
            return [{
                    range: retRange,
                    severity: 2
                }];
        }
        return [];
    }
};
return rule;
//2.5.4