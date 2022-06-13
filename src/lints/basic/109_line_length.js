return {
    name: "line_length",
    tags: ['basic'],
    desc: { cn: '一行不能超出120个字符。', en: 'Do not put over 120 characters in a line.' },
    document: 109,
    check(document) {
        let lineCount = document.getLineSize();
        for (let i = 0; i < lineCount; ++i) {
            let fromTo = document.getLineRange(i);
            if (fromTo.to - fromTo.from > 120) {
                let start = document.positionAt(fromTo.from);
                let end = document.positionAt(fromTo.to);
                return [{
                    range: { start, end },
                    severity: 2
                }];
            }
        }
        return [];
    }
};

//2.7.1