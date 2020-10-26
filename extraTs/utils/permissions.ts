import { permissions } from '../constant';

export function hasPermission(moduleName : String, role : String, permissionType : String) :Boolean {
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




