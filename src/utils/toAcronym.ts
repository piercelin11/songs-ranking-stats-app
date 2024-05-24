

export default function toAcronym (string: string | null) {
    if(!string) return;
    if (string.length > 18) {
        const words = string.split(" ");
        const initials = words.map( item => item.charAt(0) );

        return initials.join("").toUpperCase();
    } else {
        return string;
    }
}