"use strict";
const rule = {
    name: 'table_index_from_zero',
    desc: { cn: '禁止显式指定array下标从0开始，否则很多标准库的使用会不达预期。',
        en: 'Do not index an array from zero, otherwise many standard libraries wont meet the expectation.' },
    tags: ['advance'],
    document: 142,
    check: function (document) {
        let retRange;
        let nodes=document.ast.select(node=>{
            let tbl=node.anyNode().asTable();
            if(tbl){
                let fields=tbl.getFields();
                if(fields.length<1){
                    return false;
                }
                for(let field of fields){
                    let key =field.getKeyAsExp();
                    if(key){
                        let text=key.getText();
                        if(text=='0'){
                            retRange=key.getRange();
                            return true;
                        }
                    }
                }
            }
            let assignNode=node.anyNode().asAssign();
            if(assignNode){
                let assigns=assignNode.getAssigns();
                for(let ass of assigns){
                    let idx=ass.variable.anyNode().asIndex();
                    if(!idx){
                        continue;
                    }
                    let exp =idx.getIndexExp();
                    if(!exp){
                        continue;
                    }
                    if(exp.getText()=='0'){
                        retRange=exp.getRange();
                        return true;
                    }
                }
            }
            
            return false;
        },1);
        if(nodes.length>0){
            return[{
                range: retRange,
                severity: 3
            }]
        }
        return [];
    }
};
return rule;
//3.2.21