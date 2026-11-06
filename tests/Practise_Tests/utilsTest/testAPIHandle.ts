import { APIRequestContext, expect } from "@playwright/test";

interface loginPayload {
  email: string;
  password: string;
}

let eventData: Record<string, any> = {};

export class testAPIHandle {
  constructor(
    public apiContext: APIRequestContext,
    public loginPayload: loginPayload,
    public API_URL: string,
  ) {}
  async login() {
    const response = await this.apiContext.post(`${this.API_URL}/auth/login`, {
      data: this.loginPayload,
    });
    expect(response.ok()).toBeTruthy();
    const jsonResponse = await response.json();
    return jsonResponse.token;
  }
  async getEventId() {
    eventData.token = await this.login();
    const response = await this.apiContext.get(`${this.API_URL}/events`, {
      headers: {
        Authorization: `Bearer ${eventData.token}`,
      },
    });
    expect(response.ok()).toBeTruthy();
    const jsonResponse = await response.json();
    eventData.eventId = jsonResponse.data[0].id;
  }

  async bookEvent() {
    const response = await this.apiContext.post(`${this.API_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${eventData.token}`,
      },
      data: {
        eventId: eventData.eventId,
        customerEmail: "test123@yahoo.com",
        customerName: "test",
        customerPhone: "1234567899",
        quantity: 1,
      },
    });
    expect(response.ok()).toBeTruthy();
    const jsonResponse = await response.json();
    eventData.yahooBookingId = jsonResponse.data.id;
    console.log(eventData);
    return eventData;
  }
}
