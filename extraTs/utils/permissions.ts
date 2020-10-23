const permissions = {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    delete: [],
    },
    'getAccess' : {
        all : ['trainer'],
        read : ['trainee','head-trainer'],
        write : ['trainer'],
        delete : ['head-trainer'],
    }
}

console.log(permissions);
export function hasPermission(moduleName, role, permissionType){
    for (const [key,value] of Object.entries(permissions)){
        if (key === moduleName){
            if(value.all.includes(role)){
                return true;
            }
            else{
                for(const [key1,value1] of Object.entries(value)){
                    if(key1 == permissionType){
                        if(value1.includes(role)){
                            return true;
                        }
                        return false;
                    }
                    else{
                        continue;
                    }
                }
            }
        }
        else{
            continue;
        }
    }
}

//console.log("'getAccess','trainer','all' : " ,hasPermission('getAccess','tainer','all'));
//console.log("'getAccess','head-trainer','read' : " ,hasPermission('getAccess','head-trainer','read'));
//console.log("'getUsers','trainer','write' : " ,hasPermission('getUsers','trainer','write'));
//console.log("'getUsers','trainer','delete' : " ,hasPermission('getUsers','head-tainer','delete'));




