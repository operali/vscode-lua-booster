"use strict";
const rule = {
    name: 'for_in_underline',
    desc: { cn: '循环中忽略的变量使用 _ 。',
        en: 'If a letiable is not used in a for loop, use _ as its name.' },
    tags: ['intermediate'],
    document: 134,
    check: function (document) {
        let retRange;
        let nodes=document.ast.select(node => {
            if(!node.isBlock){
                return false
            }
            let block=node.anyNode().asBlock()
            if(!block){
                return false;
            }
            let parent=block.getParent();
            if(!parent){
                return false;
            }
            let ForInNode=parent.anyNode().asForIn();
            if(!ForInNode){
                return false;
            }
            let names=ForInNode.getNames();
            if(names.length<1){
                return false;
            }
            for(let firstName of names){
                let text=firstName.getText();
                if(text =="_"){
                    continue;
                }
                else{
                    let count=0
                    let pos=firstName.getRange().start;
                    let symbs=document.getSymbolsByPos(pos.line,pos.character);
                    let symb=symbs[0];
                    let states=block.getStats()
                    for(let sta of states){
                        let res=sta.select(node=>{
                            let pos=node.getRange().start;
                            let sym=document.getSymbolsByPos(pos.line,pos.character)[0];
                            if(!sym){
                                return false;
                            }
                            if(sym.equal(symb)){
                                return true;
                            }
                            return false;
                        });
                        if(res.length>0){
                            count++;
                        }
                    }
                    if(count==0){
                        retRange = firstName.getRange();
                        return true;
                    }
                }
            }
            
            return false;
        },1);
        if(nodes.length>0){
            return [{
                range: retRange,
                severity: 2
            }];
        }
        
        return [];
    }
};
return rule;
//2.13.3