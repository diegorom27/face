const findAlpha_Betha = (i1p1,i1p2,i2p1,i2p2,iOp1,iOp2) => {
    return {
        alpha: (iOp1.x*i2p2.x - iOp2.x*i2p1.x)/(i1p1.x*i2p2.x - i1p2.x*i2p1.x),
        betha: (iOp2.x*i1p1.x - iOp1.x*i1p2.x)/(i1p1.x*i2p2.x - i1p2.x*i2p1.x)
    }
}
const provePoint = (tol,alpha,betha,i1,i2,iO)=>{
    const expectedX = alpha * i1.x + betha * i2.x
    const error = Math.abs(expectedX-iO.x )/iO.x;
    return [error<tol,Math.pow((expectedX-iO.x),2)]
}
const reorientar = (points, point,index)=>{
    const newPoints={}
    for(let i in points){
        newPoints[i] = {
            x:points[i].x - point.x,
            x:points[i].x - point.y,
        }
    }
    newPoints[index] = point
    return newPoints
}
export const identifyObject =(front,lateral,objetive,equivalentPoint)=>{
    const result = [],
          errors=[]
    let point ={}
    /*
    const newLateral = reorientar(lateral.coors.points,lateral.coors.points[2])
    const newFront = reorientar(front.coors.points,front.coors.points[32])
    if(Object.keys(objetive.coors.points).length<30){
        point=objetive.coors.points[2]
    }else{
        point=objetive.coors.points[32]
    }
    const newObjetive = reorientar(objetive.coors.points,point)
    */   
    const newLateral = lateral.coors.points 
    const newFront = front.coors.points
    const newObjetive = objetive.coors.points
    const i1p1 = newFront[13],
          i2p1 = newLateral[13],
          iOp1 = newObjetive[13],
          i1p2 = newFront[2],
          i2p2 = newLateral[2],
          iOp2 = newObjetive[2]
    const {alpha,betha} = findAlpha_Betha(i1p1,i1p2,i2p1,i2p2,iOp1,iOp2)

    for(let i in newFront){
        let a= newFront[i],
            b= (newLateral[i])?newLateral[i]:newLateral[equivalentPoint[i]],
            c= (newObjetive[i])?newObjetive[i]:newObjetive[equivalentPoint[i]]
        const [boolean,error] = provePoint(0.06,alpha,betha,a,b,c)
        result.push(boolean)
        errors.push(error)
    }
    let res=result.every((e)=>e)?'Objeto identificado':'No lo se rick, parece falso'
    let res1=Math.sqrt(errors.reduce((a,b)=>a+b)/errors.length)
    console.log(errors,result)
    alert(`El error cuadratico medio es de ${res1}, ${res}`)
}