"use strict";
const rule = {
    name: 'function_call_without_brackets',
    desc: { cn: '函数调用不能省略括号',
        en: 'Do use brackets while applying a function.' },
    tags: ['intermediate'],
    document: 111,
    check: function (document) {
        let retRange;
        let nodes = document.ast.select(function (node) {
            let functionCall = node.anyNode().asApply();
            if (!functionCall) {
                return false;
            }
            let params = functionCall.getParams();
            if (params.length != 1) {
                return false;
            }
            let method = functionCall.getPrefixExp();
            if (!method) {
                return false;
            }
            let methodRange = method.getRange();
            let paramRange = params[0].getRange();
            let left = document.offsetAt(methodRange.end);
            let right = document.offsetAt(paramRange.start);
            let betweenText = document.getText(left, right);
            if (betweenText.indexOf("(") == -1) {
                retRange = paramRange;
                return true;
            }
            return false;
        }, 1);
        if (retRange) {
            return [{
                    range: retRange,
                    severity: 2
                }];
        }
        return [];
    }
};
return rule;
//2.5.2