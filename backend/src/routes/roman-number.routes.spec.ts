import request from "supertest";
import app from "../app";

describe("GET /roman-numbers/:integer", () => {

  it("should return 200 when integer parameter is valid", async () => {
    // Given
    const route: string = "/roman-number/1";

    // When
    const response = await request(app).get(route);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual({value: "I"});
  });

  it("should return 400 when integer parameter is invalid", async () => {
    // Given
    const route: string = "/roman-number/-1";

    // When
    const response = await request(app).get(route);

    // Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [{
        "location": "params",
        "msg": "Must be an integer between 0 and 100",
        "param": "integer",
        "value": "-1",
      }]
    });
  });

  it("should return 404 when integer parameter is empty", async () => {
    // Given
    const route: string = "/roman-number/";

    // When
    const response = await request(app).get(route);

    // Then
    expect(response.status).toBe(404);
  });
});
