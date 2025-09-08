const isIterable = (obj) => Symbol.iterator in obj;
const compareMapLike = (iterableA, iterableB) => {
  const mapA = iterableA instanceof Map ? iterableA : new Map(iterableA);
  const mapB = iterableB instanceof Map ? iterableB : new Map(iterableB);
  if (mapA.size !== mapB.size) return false;
  for (const [key, value] of mapA) {
    if (!Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (isIterable(objA) && isIterable(objB)) {
    const iteratorA = objA[Symbol.iterator]();
    const iteratorB = objB[Symbol.iterator]();
    let nextA = iteratorA.next();
    let nextB = iteratorB.next();
    if (Array.isArray(nextA.value) && Array.isArray(nextB.value) && nextA.value.length === 2 && nextB.value.length === 2) {
      return compareMapLike(
        objA,
        objB
      );
    }
    while (!nextA.done && !nextB.done) {
      if (!Object.is(nextA.value, nextB.value)) {
        return false;
      }
      nextA = iteratorA.next();
      nextB = iteratorB.next();
    }
    return !!nextA.done && !!nextB.done;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const keyA of keysA) {
    if (!Object.hasOwn(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}

export { shallow };
