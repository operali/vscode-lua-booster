"use strict";
const rule = {
    name: 'not_too_many_circuits',
    desc: { cn: '函数中的嵌套尽量控制在3-4层，过多层嵌套会极大程度降低代码的可读性。',
            en: 'Do not have too many circuits within one function.' },
    tags: ['basic'],
    document: 114,
    check(document) {
        let retRange;
        function checkBlock(document, block) {
            let blocks = [block];
            let level = 0;
    
            while (blocks.length !== 0) {
                let subblocks = [];
    
                for (let i = 0; i < blocks.length; i++) {
                    const parent = blocks[i].getParent();
    
                    if (parent && parent.isFunctionBody() && blocks[i]._id !== block._id) {
                        checkBlock(document, blocks[i]);
                    }
                    else if (level < 5) {
                        let stats = blocks[i].select(subnode => {
                            return subnode.isBlock();
                        });
                        for(let state of stats){
                            let block = state.anyNode().asBlock();
                            block._id = state._id;
                            subblocks.push(block);
                        }
                    }
                    else {
                        retRange = parent?.getRange();
                    }
                }
                blocks = subblocks;
                level++;
            }
        }

        let block = document.ast?.getBlock();
        block && checkBlock(document,block);
        if(retRange){
            return [{
                range : retRange,
                severity: 2
            }];
        }
        return [];
    }
}
return rule;
//2.5.6
