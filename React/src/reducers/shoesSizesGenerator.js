
export const generateSizes = (start, stop, step) => {
    let sizes = [];
    for(let i = start; i <= stop; i += step) {
        sizes.push(i);
    }
    return sizes;
}