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