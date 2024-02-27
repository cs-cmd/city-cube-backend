const specialChars = ['<', '>', '&', "'", '"', '/'];
const escapeMap = new Map();
const reverseEscapeMap = new Map();

for(let i = 0; i < specialChars.length; i += 1) {
    const char = specialChars[i];
    const charCode = char.charCodeAt(0);

    escapeMap.set(char, charCode);
    reverseEscapeMap.set(charCode, char);
}

// trims leading and following whitespace, converts special characters
// to HTML format, and 
function sanitize(str) {
    if(typeof(str) !== 'string') {
        return str;
    }
    
    let escapedAndTrimmed = '';
    let foundNonSpace = false;

    let lastCharIndex = str.length - 1;

    // find last non-space char
    for(let i = lastCharIndex; i >= 0; i -= 1) {
        if(str.charAt(i) !== ' ') {
            lastCharIndex = i;
            break;
        }
    }

    // iterate through until lastChar
    for(let i = 0; i <= lastCharIndex; i += 1) {
        const char = str.charAt(i);

        if(char === ' ' && !foundNonSpace) {
            continue;
        } else if (!foundNonSpace) {
            foundNonSpace = true;
        }

        let addChar = char;
        if(escapeMap.has(addChar)) {
            addChar = escapeMap.get(addChar);
        }

        escapedAndTrimmed += addChar;
    }

    return escapedAndTrimmed;
}


function desanitize(str) {

}

export { sanitize };