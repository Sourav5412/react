import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // _.slice(items,startIndex) slicing array not included the end
    // _.take() takes no. from the begining
    return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}