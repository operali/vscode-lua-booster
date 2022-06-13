return {
    name: "duplicate_keys",
    tags: ['basic'],
    desc: { cn: '重复的表键值。', en: 'Duplicate keys in table.' },
    document: 105,
    check(document) {
        var _a;
        let nodes = (_a = document.ast) === null || _a === void 0 ? void 0 : _a.select(node => {
            return node.isTable();
        });
        let nodesFound = nodes === null || nodes === void 0 ? void 0 : nodes.map(node => node.anyNode().asTable());
        if (nodesFound) {
            for (let tabNode of nodesFound) {
                let fs = tabNode.getFields();
                let keySet = new Map();
                for (let f of fs) {
                    let n = f.getKeyAsName();
                    if (n === undefined) {
                        continue;
                    }
                    let keyName = n.getText();
                    let keyNode = keySet.get(keyName);
                    if (keyNode) {
                        return [{
                            range: keyNode.getRange(),
                            severity: 1
                        }, {
                            range: n.getRange(),
                            severity: 1
                        }];
                    }
                    else {
                        keySet.set(n.getText(), n);
                    }
                }
            }
        }
        return [];
    }
};
