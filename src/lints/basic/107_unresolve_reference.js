const rule = {
    name: "unresolved reference",
    tags: ['basic'],
    desc: { cn: '未声明引用。', en: 'Unresolved reference.' },
    document: 107,
    check(document) {
        let ast = document.ast;
        if (ast == undefined) {
            return []
        }

        let rets = [];

        let scope = document.getScope();
        if (!scope) {
            return [];
        }
        document.ast.select(node=>{
            if (node.isExp()) {
                if (node.isName()) {
                    let nameNode = node.anyNode().asName();
                    let symInfo = document.getSymbolInfo(nameNode.getRange().start);
                    if (!symInfo.type) {
                        rets.push({
                            range: nameNode.getRange(),
                            severity: 1
                        });
                        return true;
                    }
                } else if (node.isNameIndex()) {
                    let nameIndexNode = node.anyNode().asNameIndex();
                    let names = nameIndexNode.getNames();
                    if (names.length === 0) {
                        return false;
                    }
                    let lastName = names[names.length-1]
                    let pos = lastName.getRange().start;
                    let symInfo = document.getSymbolInfo(pos);
                    if (!symInfo.type) {
                        rets.push({
                            range: nameIndexNode.getRange(),
                            severity: 1
                        });
                        return true;
                    }
                }
            }
            return false;
        },1)
        return rets;
    }
};

return rule;
