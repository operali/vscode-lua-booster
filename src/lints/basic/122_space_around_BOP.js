"use strict";

const rule = {
    name: 'space_around_BOP',
    desc: { cn: `赋值操作符、比较操作符、算术操作符、逻辑运算符等二元操作符的前后应当加一个空格。`,
        en: 'There should be one and only one space, before and after a binary operator.' },
    tags: ['basic'],
    document: 122,
    check: function (document) {
        let retRange;
        let nodes = document.ast.select(function (node) {
            if (!node.isBOP()) {
                return false;
            }
            let BOP = node.anyNode().asBOP();
            if (!BOP) {
                return false;
            }
            let nodeRange = BOP.getRange();
            let start = nodeRange.start;
            let end = nodeRange.end;
            let rights = BOP.getRights();
            let ops = rights.map(function (item) { return item.op; });
            let content = document.getTextEx(start, end);
            let pos = 0;
            for (let _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
                let opr = ops_1[_i];
                if(opr == "^"){
                    continue;
                }
                let opn = content.indexOf(opr, pos);
                if (opn != -1) {
                    pos = opn + 1;
                    let oplen = opr.length;
                    if (content.charAt(opn - 1) != ' ' || content.charAt(opn + oplen) != ' ') {
                        retRange = nodeRange;
                        return true;
                    }
                    else if ((opn - 2 >= 0 && content.charAt(opn - 2) == " ") || (opn + oplen + 1 <= content.length && content.charAt(opn + oplen + 1) == " ")) {
                        retRange = nodeRange;
                        return true;
                    }
                }
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
return rule
//2.8.2