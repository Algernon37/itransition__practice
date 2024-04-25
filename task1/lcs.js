let strings = process.argv.slice(2);
function longestCommonSubstring(strings) {
    if (!strings.length) return '';
    let substr = '';
    for (let i = 0; i < strings[0].length; i++) {
        for (let j = i + substr.length + 1; j <= strings[0].length; j++) {
            let candidate = strings[0].slice(i, j);
            if (strings.every(str => str.includes(candidate))) {
                substr = candidate;
            } else {
                break;
            }
        }
    }
    return substr;
}
console.log(longestCommonSubstring(strings));


















