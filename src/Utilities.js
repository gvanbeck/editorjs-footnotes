export function cleanChars (chars, regex) {
    return chars.match(regex).join('')
};

export function getRandomID(n) {
    function getSomeChars() {
        const min = 1000 * 1000 * 1000
        const max = 10 * min - 1
        return (Math.random() * (max - min) + min).toString(36)
    }

    let ret = ''
    while (ret.length < n) {
        ret = ret.concat(cleanChars(getSomeChars().toLowerCase(), /[a-z0-9]/g))
    }

    return '#fn-' + ret.slice(0, n)
};
