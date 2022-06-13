"use strict";
const rule = {
    name: 'judge_empty_table',
    desc: { cn: '使用next判断空表。',
        en: 'Use next to judge whether a table is empty.' },
    tags: ['advance'],
    document: 143,
    check: function (document) {
        let nodes = document.ast.select(function (node) {
            let BOP = node.anyNode().asBOP();
            if (!BOP) {
                return false;
            }
            let left = BOP.getLeft();
            let rights = BOP.getRights();
            let leftType = left.getType();
            let rightType = rights[0].exp.getType();
            if (leftType == 'table' && rightType == 'nil') {
                return true;
            }
            if (leftType == 'nil' && rightType == 'table') {
                return true;
            }
            return false;
        }, 1);
        if (nodes.length > 0) {
            return [{
                    range: nodes[0].getRange(),
                    severity: 3
                }];
        }
        return [];
    }
};
return rule;
//3.2.3