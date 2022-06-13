return {
    name: "comments",
    tags: ['basic'],
    desc: { cn: '对大段内容进行注释时，使用--[[]]。', en: 'use --[[]], if comment is more than 3 lines.' },
    document: 136,
    check(document) {
        let tok = document.parser.getToken(0);
        let singleLineCount = 0;
        if (tok) {
            let comments = tok.getComments();
            if(comments.length > 0){
                let startIndex = 0;
                let ranges = tok.getCommentRanges();
                for (let i = 0; i < comments.length; i++) {
                    const com = comments[i];
                    if (com.startsWith('--[[') || com.startsWith('-- [[') || com.startsWith('---')) {
                        singleLineCount = 0;
                        if(i + 1 < comments.length-1){
                            startIndex = i+1
                        }
                        continue;
                    }

                    if(ranges[i]){
                        if(i>0 && ranges[i].start?.line !== ranges[i-1].start?.line+1){
                            singleLineCount = 0;
                            if(i + 1 < comments.length-1){
                                startIndex = i+1
                            }
                            continue;
                        }
                    }
                    singleLineCount++;
                    if (singleLineCount > 3) {
                        let start  = ranges[startIndex].start;
                        let end = ranges[ranges.length-1].end;
                        return [{
                            range:{start,end},
                            severity:2
                        }];
                    }
                }
            }
            
        }
        while (tok) {
            singleLineCount = 0;
            let comments = tok === null || tok === void 0 ? void 0 : tok.getCommentsPost();
            if(comments && comments.length > 0){
                let startIndex = 0;
                let ranges = tok.getCommentRangesPost();
                for (let i = 0; i < comments.length; i++) {
                    const com = comments[i];
                    if (com.startsWith('--[[') || com.startsWith('-- [[') || com.startsWith('---')) {
                        singleLineCount = 0;
                        if(i + 1 < comments.length-1){
                            startIndex = i+1
                        }
                        continue;
                    }
                    if(ranges[i]){
                        if(i>0 && ranges[i].start?.line !== ranges[i-1].start?.line+1){
                            singleLineCount = 0;
                            if(i + 1 < comments.length-1){
                                startIndex = i;
                            }
                            continue;
                        }
                    }
                    
                    singleLineCount++;
                    if (singleLineCount > 3) {
                        let start  = ranges[startIndex].start;
                        let end = ranges[ranges.length-1].end;
                        return [{
                            range:{start,end},
                            severity:2
                        }];
                    }
                }
            }
            
            tok = tok.next();
        }
        return [];
    }
    
};
//2.14.4
