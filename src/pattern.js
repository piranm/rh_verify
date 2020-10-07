export function verify(s, pattern) {
  if (s === "" && pattern === "") {
    return true;
  } else if (pattern === "") {
    return false;
  } else if (pattern[0] === "*") {
    const tail = pattern.substring(1);
    // Optimization: If tail is empty, then return true
    // or be greedy, and loop backwards.
    // Not implemented, as not discussed in interview.
    for (let i = 0; i <= s.length; i++) {
      if (verify(s.substring(i), tail)) {
        return true;
      }
    }
    return false;
  } else if (s === "") {
    return false;
  } else {
    if (s[0] === pattern[0]) {
      return verify(s.substring(1), pattern.substring(1));
    } else {
      return false;
    }
  }
}
