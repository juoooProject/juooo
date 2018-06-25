export function saveToLocal(id, key, value) {
    let juooo = window.localStorage.__juooo__;
    if (!juooo) {
        juooo = {};
        juooo[id] = {};
    } else {
        juooo = JSON.parse(juooo);
        if (!juooo[id]) {
            juooo[id] = {};
        }
    }
    juooo[id][key] = value;
    window.localStorage.__juooo__ = JSON.stringify(juooo);
};

export function loadFromLocal(id, key, def) {
    let juooo = window.localStorage.__juooo__;
    if (!juooo) {
        return def;
    }
    juooo = JSON.parse(juooo)[id];
    if (!juooo) {
        return def;
    }
    let ret = juooo[key];
    return ret || def;
};