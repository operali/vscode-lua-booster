"use strict";
const rule = {
    name: 'judge_directly',
    desc: { cn: '除非需要明确false与nil，否则直接利用条件判断即可。',
        en: 'Judge true directly unless you have to specify false and nil' },
    tags: ['intermediate'],
    document: 131,
    check: function (document) {
        var nodes = document.ast.select(function (node) {
            var BOP = node.anyNode().asBOP();
            if (!BOP) {
                return false;
            }
            var rights = BOP.getRights();
            for (var _i = 0, rights_1 = rights; _i < rights_1.length; _i++) {
                var right = rights_1[_i];
                var op = right.op;
                if (op == "~=" && (right.exp.getText() == "false" || right.exp.getText() == "nil")) {
                    return true;
                }
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
//2.11.2