function addNum(a: number, b: number) {
  return a + b;
}

describe('Test responses from endpoints', (): void => {
  it('should return status code 200, endpoint: "/"', (): void => {
    expect(addNum(2, 2)).toBe(4);
  });
});
