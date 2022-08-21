const getDate = (type, timestamp) => {
    const date = new Date(timestamp);
    return type === "string" ? date.toLocaleString() : date;
};
const mult = (x, y) => x * y;
const getRepeatArr = target => new Array(100).fill(target);
getRepeatArr('123');
