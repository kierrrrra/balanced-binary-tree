/**
 * Mergesort algorith for integer arrays
 * 1. Divide down until single item arrays
 * 2. Merge items in arrays in order
 */
var mergesort = function (arr) {
    var divideAndConquer = function (values) {
        if (values.length < 2) {
            return values;
        }

        var middle = Math.floor(values.length / 2);

        return merge(divideAndConquer(values.slice(0, middle)), divideAndConquer(values.slice(middle)));
    }


    var merge = function (a, b) {
        var result = [],
            i = 0,
            j = 0;

        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) {
                result.push(a[i]);
                i ++;
            } else if (b[j] <= a[i]) {
                result.push(b[j]);
                j ++;
            }
        }

        result = result.concat(a.slice(i, a.length));
        result = result.concat(b.slice(j));

        return result;
    }

    return divideAndConquer(arr);
}