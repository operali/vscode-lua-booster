"use strict";
const rule = {
    name: 'no_semicolon_in_line',
    desc: { cn: '不要通过;对语句分行，从而使一行中有多条语句。一行只能有一个语句',
        en: 'Do not use [;] to divide a line and make one line has multiple statements. One line can only have one statement.' },
    tags: ['advance'],
    document: 127,
    check: function (document) {
        let nodes = document.ast.select(function (node) {
            let semi = node.anyNode().asSemicolon();
            if (!semi) {
                return false;
            }
            let line = semi.getRange().end.line;
            let lineRange = document.getLineRangeEx(line);
            let start = semi.getRange().end;
            let end = lineRange.end;
            let text = document.getTextEx(start, end);
            if (!text.match(/^[ ]*$/) && text != '\r') {
                return true;
            }
            return false;
        }, 1);
        if (nodes.length > 0) {
            let node = nodes[0];
            return [{
                    range: node.getRange(),
                    severity: 2
                }];
        }
        return [];
    }
};
return rule;
//2.10.1