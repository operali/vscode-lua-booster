"use strict";
const rule = {
    name: 'global_variable_upper_case',
    desc: { cn: '全局的常量命名，均用大写，区分普通变量',
        en: 'The name of a global variable should all be in upper case.' },
    tags: ['basic'],
    document: 135,
    check: function (document) {
        var globals = document.getGlobalSymbols();
        for (var i = 0; i < globals.length; ++i) {
            var sym = globals[i];
            if (sym.getName() === '_G') {
                continue;
            }
            var range = sym.getSelectRange();
            var name_1 = sym.getName();
            // let startNum = document.offsetAt(range.start);
            // let endNum = document.offsetAt(range.end);
            var text = name_1;
            for (var i_1 = 0; i_1 < text.length; i_1++) {
                if (text.charAt(i_1) >= 'a' && text.charAt(i_1) <= 'z') {
                    return [{
                            range: range,
                            severity: 3
                        }];
                }
            }
        }
        return [];
    }
};
return rule;
//2.13.7