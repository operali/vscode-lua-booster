return {
    name: "utf8",
    tags: ['basic'],
    desc: { cn: '代码文件必须为utf8编码。', en: 'The coding file must be encoded by utf8.' },
    document: 137,
    check(document) {
        let firstLineRange = document.getLineRangeEx(0);
        if (document.encoding !== 'UTF-8' && document.encoding !== 'ascii') {
            return [{
                range: firstLineRange,
                severity: 1
            }];
        }
        return [];
    }
};
//2.18