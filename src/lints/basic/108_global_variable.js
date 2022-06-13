return {
    name: "global variable",
    tags: ['basic'],
    desc: { cn: '尽量不要暴露全局变量。', en: 'Try not to expose global variable as possible' },
    document: 108,
    check(document) {
        let diagnostics = [];
        let globals = document.getGlobalSymbols();
        // 最多显示5个
        for (let i = 0; i < globals.length && i < 5; ++i) {
            let sym = globals[i];

            if (sym.getName() === '_G') {
                continue;
            }
            diagnostics.push({ range: sym.getSelectRange(), severity: 2 });
        }

        return diagnostics;
    }
};

//2.6.1