"use strict";
const rule = {
    name: 'for_string_concat',
    desc: { cn: '对于循环拼接字符串场景，使用table.concat',
        en: 'Use table.concat if you want to concat strings in a loop.' },
    tags: ['advance'],
    document: 141,
    check: function (document) {
        function getConcator(forNode) {
            let concactExps = forNode.select(function (snode) {
                let bop = snode.anyNode().asBOP();
                if (bop) {
                    let rights = bop.getRights();
                    for (let _i = 0, rights_1 = rights; _i < rights_1.length; _i++) {
                        let right = rights_1[_i];
                        if (right.op == '..') {
                            return true;
                        }
                    }
                }
                return false;
            });
            if (concactExps.length > 0) {
                let node = concactExps[0];
                return node.getRange();
            }
            return undefined;
        }
        let nodes = document.ast.select(function (node) {
            let forInNode = node.anyNode().asForIn();
            if (forInNode) {
                let range = getConcator(forInNode);
                if (range) {
                    return true;
                }
            }
            let forStepNode = node.anyNode().asForStep();
            if (forStepNode) {
                let range = getConcator(forStepNode);
                if (range) {
                    return true;
                }
            }
            let whileNode = node.anyNode().asWhile();
            if (whileNode) {
                let range = getConcator(whileNode);
                if (range) {
                    return true;
                }
            }
            let repeatNode = node.anyNode().asRepeat();
            if (repeatNode) {
                let range = getConcator(repeatNode);
                if (range) {
                    return true;
                }
            }
            return false;
        }, 1);
        if (nodes.length > 0) {
            let node = nodes[0];
            let range = getConcator(node);
            if (range) {
                return [{
                        range: range,
                        severity: 3
                    }];
            }
        }
        return [];
    }
};
return rule;
//3.1.2