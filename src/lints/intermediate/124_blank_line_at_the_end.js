"use strict";
const rule = {
    name: 'Blank_line_at_the_end',
    desc: { cn: '用一空行作为文件结尾.',
        en: 'Add a blank line at the end of a file.' },
    tags: ['intermediate'],
    document: 124,
    check: function (document) {
        let totalLine = document.getLineSize();
        let lineRange = document.getLineRangeEx(totalLine-1);
        let text = document.getTextEx(lineRange.start, lineRange.end);
        if (!text.match(/^[ ]*$/) && text !== '\r') {
            return [{
                    range: lineRange,
                    severity: 3
                }];
        }
        return [];
    }
};
return rule;
//2.8.5