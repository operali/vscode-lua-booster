return {
    name: "line_size",
    tags: ['basic'],
    desc: { cn: '超出最大行数(500)。', en: 'The document has too many lines.(more than 500).' },
    document: 106,
    check(document) {
        let lineCount = document.getLineSize();
        if (lineCount > 500) {
            return [{
                range: document.getRange(),
                severity: 2
            }];
        }
        return [];
    }
};
