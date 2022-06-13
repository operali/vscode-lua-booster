"use strict";

const rule = {
    name: 'space_around_assign',
    desc: { cn: '赋值操作符前后应当加空格。',
        en: 'There should be one and only one space ,before and after a `=`.' },
    tags: ['basic'],
    document: 121,
    check: function (document) {
        let nodes=document.ast.select(node=>{
            let assignNode=node.anyNode().asAssign();
            if(!assignNode){
                let fieldNode = node.anyNode().asField();
                if(fieldNode){
                    let key = fieldNode.getKeyAsName() != undefined ? fieldNode.getKeyAsName():fieldNode.getKeyAsExp();
                    if(key){
                        let text=fieldNode.getText();
                        let idx=text.indexOf("=");
                        if(idx == -1){
                            return false;
                        }
                        if(text[idx-1]!=" " || text[idx+1]!=" " || text[idx-2]==" " || text[idx+2]==" "){
                            return true;
                        }
                    }
                }
                return false;
            }
            
            let text=assignNode.getText();
            let idx=text.indexOf("=");
            if(idx == -1){
                return false;
            }
            if(text[idx-1]!=" " || text[idx+1]!=" " || text[idx-2]==" " || text[idx+2]==" "){
                return true;
            }
            return false;
        },1);
        if(nodes.length>0){
            let node=nodes[0];
            return [{
                range: node.getRange(),
                severity: 2
            }];
        }
        return [];
        
    }
};
return rule
//2.8.2