"use strict";

const rule = {
    name: 'space_near_comma',
    desc: { cn: '逗号之前避免使用空格，逗号之后需要使用空格。',
        en: 'Don not add a space in front of comma, do add a space after it.' },
    tags: ['basic'],
    document: 123,
    check: function (document) {
        let retRange;
        let tok = document.parser.getToken(0);
        while (tok) {
            if (tok.getText() != ',') {
                tok = tok.next();
                continue;
            }
            let fromTo = tok.getRange();
            let tokRange = tok.getRangeEx();
            let line = tokRange.start.line;
            let lineEnd = document.getLineRange(line).to;
            let textBefore = document.getText(fromTo.from - 1, fromTo.from);
            if (textBefore == ' ') {
                retRange = tokRange;
                break;
            }
            if (fromTo.to != lineEnd) {
                let textAfter = document.getText(fromTo.to, fromTo.to + 1);
                if (textAfter != ' ' && textAfter != '\r'){
                    retRange = tokRange;
                    break;
                }
            }
            tok = tok.next();
        }
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
//2.8.3