export const extractUrl = (value: string): string => {
    const urlRegex = /(https?:\/\/[^ ]*)/;
    const urls = value.match(urlRegex)
    if (urls) {
        let url = urls[1]
        url = url.replace("(", "")
        url = url.replace(")", "")
        return url;
    }
    return ''
}

export const cleanString = (value: string): string => {
    return value
        .replace("(", "")
        .replace(")", "")
        .replace(":", "")
        .replace("-", "")
}