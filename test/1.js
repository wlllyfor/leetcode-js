function getFirstStr(name) {
  try {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    for (let i = 0; i < name.length; i++) {
      if (reg.test(name[i])) {
        return name[i].toUpperCase();
      }
    }
    return '';
  } catch {
    return '';
  }
}

console.log('11', getFirstStr('111'));