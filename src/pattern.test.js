import { verify } from "./pattern";

describe("verify", () => {
  it("matches empty strings", () => {
    expect(verify("", "")).toBeTruthy();
  });
  it("doesn't match empty pattern", () => {
    expect(verify("a", "")).toBeFalsy();
  });
  it("matches identical strings", () => {
    expect(verify("tata", "tata")).toBeTruthy();
  });
  it("fails different strings", () => {
    expect(verify("abc", "xyz")).toBeFalsy();
  });
  it("matches * to anything", () => {
    expect(verify("", "*")).toBeTruthy();
    expect(verify("abc", "*")).toBeTruthy();
    expect(verify("*", "*")).toBeTruthy();
    expect(verify("a*start", "*")).toBeTruthy();
  });
  it("matches * at end", () => {
    expect(verify("abc", "abc*")).toBeTruthy();
    expect(verify("abcd", "abc*")).toBeTruthy();
    expect(verify("abcdef", "abc*")).toBeTruthy();
    expect(verify("ab", "abc*")).toBeFalsy();
    expect(verify("abc", "xyz*")).toBeFalsy();
  });
  it("matches * at beginning", () => {
    expect(verify("xyz", "*xyz")).toBeTruthy();
    expect(verify("wxyz", "*xyz")).toBeTruthy();
    expect(verify("uvwxyz", "*xyz")).toBeTruthy();
    expect(verify("yz", "*xyz")).toBeFalsy();
    expect(verify("abc", "*xyz")).toBeFalsy();
  });
  it("matches * in middle", () => {
    expect(verify("ac", "a*c")).toBeTruthy();
    expect(verify("abc", "a*c")).toBeTruthy();
    expect(verify("xyz", "a*c")).toBeFalsy();
  });
  it("matches multiple *s", () => {
    expect(verify("pr", "*p*r*")).toBeTruthy();
    expect(verify("pqr", "*p*r*")).toBeTruthy();
    expect(verify("apqrz", "*p*r*")).toBeTruthy();
    expect(verify("ppprrr", "*p*r*")).toBeTruthy();
    expect(verify("rp", "*p*r*")).toBeFalsy();
  });
  it("matches with sequence of *s", () => {
    expect(verify("az", "a**z")).toBeTruthy();
    expect(verify("abcxyz", "a**z")).toBeTruthy();
  });
});
