export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem(key, defaultValue = null) {
    if (localStorage.getItem(key) === null) {
        setItem(key, defaultValue);
    }

    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        data = defaultValue;
    }

    return data;
}