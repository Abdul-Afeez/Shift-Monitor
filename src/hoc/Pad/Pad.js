
    export function pad(min, placeholder, text) {
        return text.length < min ? new Array(min - text.length).fill(placeholder).join('') + text: text;
    }
