export function findValue(obj,x,y) {
    for (let key in obj) {
        let f = obj[key]
        if (((f.x+10)>=x && (f.x-10)<=x)  && ((f.y+10)>=y && (f.y-10)<=y)) {
            return obj[key]; 
        }
    }
    return null; 
}