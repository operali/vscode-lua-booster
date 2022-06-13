"use strict";
const rule = {
    name: 'no_comma_starting_a_line',
    desc: { cn: '逗号后置',
        en: 'Put comma at the end, not the beginning of a line.' },
    tags: ['basic'],
    document: 126,
    check: function (document) {
        let retRange;
        let tok = document.parser.getToken(0);
        while (tok) {
            if (tok == null || tok == void 0) {
                break;
            }
            if (tok.getText() != ',') {
                tok = tok.next();
                continue;
            }
            let fromTo = tok.getRange();
            let tokRange = tok.getRangeEx();
            let line = tokRange.start.line;
            let lineEnd = document.getLineRange(line).to;
            let textBefore = document.getText(document.getLineRange(line).from, fromTo.from);
            if (textBefore.match(/^[ ]*$/)) {
                retRange = tokRange;
                break;
            }
            // if(fromTo.to != lineEnd){
            //     let textAfter=document.getText(fromTo.to,fromTo.to+1);
            //     if(textAfter != ' '){
            //         retRange=tokRange;
            //     }
            //     break;
            // }
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
//2.9.1