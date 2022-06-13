"use strict";
const rule = {
    name: 'table_function',
    desc: { cn: '在表定义的外部定义函数',
        en: "It's recommended to define a table's function outside a table, not inside it." },
    tags: ['intermediate'],
    document: 102,
    check: function (document) {
        let retRange;
        let nodes=document.ast.select(node=> {
            if(!node.isTable){
                return false;
            }
            let tab=node.anyNode().asTable();
            if(!tab){
                return false;
            }
            let fields=tab.getFields();
            for(let field of fields){
                let val=field.getValue();
                if(val && val.asFunctionBody()){
                    retRange = field.getRange();
                    return true;
                }
            }
            return false;
        },1);
    
        if(nodes.length>0){
            return [{
                range: retRange,
                severity: 3
            }]
        }
        return [];
    }
};
return rule;
//2.3.2