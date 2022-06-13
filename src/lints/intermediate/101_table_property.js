"use strict";
const rule = {
    name: 'table_property',
    desc: { cn: '尽量在表创建时，利用构造器对其属性进行赋值',
            en: 'Try define a table`s property while creating the table, not outside it.' },
    tags: ['intermediate'],
    document: 101,
    check(document) {
        let nodes=document.ast.select(node=> {
            let assignNode=node.anyNode().asAssign();
            if(!assignNode){
                return false;
            }
            let assigns=assignNode.getAssigns();
            let assign=assigns[0];
            for(let assign of assigns){
                let idx=assign.variable.anyNode().asNameIndex();
                if(idx===undefined){
                    continue;
                }
                let curRange=idx.getName().getRange();
                let def=document.getSymbolsByPos(curRange.start.line,curRange.start.character);
                let defRange=def[0].getSelectRange();
                if(defRange.start.line==curRange.start.line){
                    return true;
                }
            }
            
            return false;
        },1);
        if(nodes.length>0){
            return [{
                range:nodes[0].getRange(),
                severity: 3
            }];
        }
        return [];
    }
}
return rule;

// 2.3.1