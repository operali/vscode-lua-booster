"use strict";
const rule = {
    name: 'use_ipairs_for_array',
    desc: { cn: 'ipairs、#关键字搭配for循环只能用来遍历array，而pairs或者next可以遍历任意集合。',
        en: 'ipairs, # plus a for loop can only be used to iterate arrays, pairs or next can iterate any set.' },
    tags: ['advance'],
    document: 145,
    check: function (document) {
        let retRange;
        let nodes=document.ast.select(node=>{
            let forInNode =node.anyNode().asForIn();
            if(!forInNode){
                return false;
            }
            let exps=forInNode.getExps();
            let exp=exps[0];
            if(!exp){
                return false;
            }
            let text=exp.getText();
            if(text.indexOf('ipairs') != -1){
                let app=exp.anyNode().asApply();
                if(app){
                    let param = app.getParams()[0];
                    let name=param.asName();
                    if(name){
                        let text=name.getText();
                        let pos=name.getRange().start;
                        let symb=document.getSymbolsByPos(pos.line,pos.character)[0];
                        if(!symb){
                            return false;
                        }
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
                                            retRange=param.getRange();
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                        
                    }

                    let idx=param.asNameIdx();
                    if(idx){
                        let Names=idx.getNames();
                        let name=Names[Names.length-1];
                        let pos=name.getRange().start;
                        let symb=document.getSymbolsByPos(pos.line,pos.character)[0];
                        if(!symb){
                            return false;
                        }
                        let symStart=symb.getRange().start
                        let Node=document.ast.getNodeByPos(symStart.line,symStart.character);
                        let fieldNode=Node?.getParent()?.anyNode().asField();
                        if(fieldNode){
                            let val=fieldNode.getValue();
                            if(val){
                                let tbl=val.asTable();
                                if(tbl){
                                    if(tbl.isHash()){
                                        retRange=param.getRange();
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            return false;
        },1);
        if(nodes.length>0){
            return [{
                range: retRange,
                severity: 3
            }];
        }

        return [];
    }
};
return rule;
//3.2.7