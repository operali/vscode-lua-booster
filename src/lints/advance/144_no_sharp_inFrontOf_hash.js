"use strict";
const rule = {
    name: 'no_sharp_infrontof_hash',
    desc: { cn: '#tb 仅适用于array(键集为{1…n}，缺一不可)，hash禁止使用#关键字来获取表长度。',
        en: '[#tb] is suitable only for array, do not use # to get the length of a hash.' },
    tags: ['advance'],
    document: 144,
    check: function (document) {
        let nodes=document.ast.select(node=>{
            let uop=node.anyNode().asUOP();
            if(!uop){
                return false;
            }
            let op=uop.getOp();
            if(op!='#'){
                return false;
            }
            let tab=uop.getExp().anyNode().asTable();
            if(tab){
                if(tab.isHash()){
                    return true;
                }
            }
    
            let name=uop.getExp().anyNode().asName();
            if(name){
                let text=name.getText();
                let pos=name.getRange().start;
                let symb=document.getSymbolsByPos(pos.line,pos.character)[0];
                let symStart=symb.getRange().start
                let assNode=document.ast.getNodeByPos(symStart.line,symStart.character);
                let ass=assNode?.anyNode().asAssign();
                if(ass){
                    let assigns=ass.getAssigns();
                    for(let a of assigns){
                        if(a.variable?.getText()==text){
                            let tbl=a.exp.asTable();
                            if(tbl){
                                if(tbl.isHash()){
                                    return true;
                                }
                            }
                        }
                    }
                }
                
            }
            
            let idx=uop.getExp().anyNode().asNameIndex();
            if(idx){
                let Names=idx.getNames();
                let name=Names[Names.length-1];
                let pos=name.getRange().start;
                let symb=document.getSymbolsByPos(pos.line,pos.character)[0];
                let symStart=symb.getRange().start
                let Node=document.ast.getNodeByPos(symStart.line,symStart.character);
                let fieldNode=Node?.getParent()?.anyNode().asField();
                if(fieldNode){
                    let val=fieldNode.getValue();
                    if(val){
                        let tbl=val.asTable();
                        if(tbl){
                            return tbl.isHash();
                        }
                    }
                }
            }
            return false;    
        },1);
        
        if(nodes.length>0){
            return[{
                range:nodes[0].getRange(),
                severity:3
            }];
        }
        
        return [];
    }
};
return rule;
//3.2.6