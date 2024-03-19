export const saveModel = async (model) => {
    try {
        fetch('/model', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    } catch (err) {
        return console.error(err);
    }
}
export const getModel = async (id) => {
    try {
        const res = await fetch('/model/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        console.log(json)
        return json
    } catch (err) {
        return console.error(err);
    }
}
export const saveImg = async (perfil,img,imageX,imageY,scale) => {
    try {
        const res = await fetch('/img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                perfil,
                img,
                imageX,
                imageY,
                scale
            })
        });
        const json = await res.json();
        return json._id
    } catch (err) {
        return console.error(err);
    }
}
export const getImg = async (id) => {
    try {
        const res = await fetch('/img/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        return json
    } catch (err) {
        return console.error(err);
    }
}