import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://api.realworld.io/api/users", () => {
    return HttpResponse.json({
      user: {
        username: "testuser",
        email: "test@example.com",
        bio: null,
        image: null,
        token: "fake-jwt-token",
      },
    });
  }),
];

