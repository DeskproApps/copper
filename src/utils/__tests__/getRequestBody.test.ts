import { getRequestBody } from "../getRequestBody";

describe("utils", () => {
  describe("getRequestBody", () => {
    test("should return form", () => {
      const form = new FormData();
      form.append("grant_type", "authorization_code");
      form.append("client_id", "123456");
      form.append("client_secret", "654321");

      expect(getRequestBody(form as never)).toEqual(form);
    });

    test("should return string", () => {
      expect(getRequestBody("foo=bar")).toEqual("foo=bar");
    });

    test("should return stringify object", () => {
      expect(getRequestBody({ foo: "bar" })).toEqual("{\"foo\":\"bar\"}");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getRequestBody(payload as never)).toBeUndefined();
    });
  });
});
