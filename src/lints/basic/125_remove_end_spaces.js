"use strict";
const rule = {
    name: 'remove_unnecessary_blanks_at_the_end',
    desc: { cn: '在行尾删除不必要的空格',
        en: 'Remove unnecessary blanks at the end of a line.' },
    tags: ['basic'],
    document: 125,
    check: function (document) {
        var totalLine = document.getLineSize();
        for (var i = 0; i < totalLine; i++) {
            var lineRange = document.getLineRangeEx(i);
            var text = document.getTextEx(lineRange.start, lineRange.end);
            
            if (text.endsWith(' ') && !text.match(/^[ ]*$/)) {
                return [{
                        range: lineRange,
                        severity: 3
                    }];
            }
            if(text.length>2 && text.endsWith('\r')){
                let strBeforeR = text.substring(text.length-2,text.length-1);
                if(strBeforeR === ' '){
                    return [{
                        range:lineRange,
                        severity: 3
                    }];
                }
            }
        }
        return [];
    }
};
return rule;
//2.8.6