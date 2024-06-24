function getType(target) {
  const type = typeof target;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString
    .call(target)
    .replace(/^\[object (\S+)\]$/, "$1")
    .toLocaleLowerCase();
}

