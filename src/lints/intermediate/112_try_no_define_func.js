"use strict";
const rule = {
    name: 'try no define func',
    desc: { cn: ' 尽量不要用变量定义的方式定义函数，以便对匿名函数进行区分',
        en: 'Try not to define a function using a definition expression.' },
    tags: ['intermediate'],
    document: 112,
    check: function (document) {
        let retRange;
        let nodes=document.ast.select(node=>{
            let assignNode = node.anyNode().asAssign();
            if(!assignNode){
                return false;
            }
            let assigns = assignNode.getAssigns();
            for(let ass  of assigns){
                if(!ass.exp){
                    return false;
                }
                if(ass.exp.anyNode().asFunctionBody()){
                    retRange = ass.exp.getRange();
                    return true;
                }
            }
            return false; 
        },1);
        
        if(retRange){
            return [{
                range: retRange,
                severity: 3
            }];
        }
        return [];
    }
};
return rule;
//2.5.3