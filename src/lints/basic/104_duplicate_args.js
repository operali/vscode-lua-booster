return {
    name: "duplicate_arguments",
    tags: ['basic'],
    desc: { cn: '重复的参数名。', en: 'Duplicate argument in function.' },
    document: 104,
    check(document) {
        let nodes = document.ast.select(node => {
            return node.isFunctionBody();
        });
        let nodesFounds = nodes.map(node => node.anyNode().asFunctionBody());
        if (nodesFounds) {
            for (let node of nodesFounds) {
                let args = node.getArguments();
                let keySet = new Map();
                for (let arg of args) {
                    let argName = arg.getText();
                    let argNode = keySet.get(argName);
                    if (argNode) {
                        return [{
                            range: argNode.getRange(),
                            severity: 1
                        }, {
                            range: arg.getRange(),
                            severity: 1
                        }];
                    }
                    else {
                        keySet.set(arg.getText(), arg);
                    }
                }
            }
        }
        return [];
    }
};