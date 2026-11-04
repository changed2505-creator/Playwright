import { APIRequestContext } from "@playwright/test";

interface OrderPayload {
  orders: {
    country: string;
    productOrderedId: string;
  }[];
}

interface loginPayload {
  userEmail: string;
  userPassword: string;
}

export class APIHandle {
  constructor(
    public apiContext: APIRequestContext,
    public loginPayload: loginPayload,
  ) {}

  async userToken(): Promise<string> {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload },
    );
    const jsonResponse = await loginResponse.json();
    const token = jsonResponse.token;

    console.log(token);
    return token;
  }

  async orderPlacer(orderPayload: OrderPayload): Promise<Record<string, any>> {
    const orderData: Record<string, any> = {};
    orderData.token = await this.userToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: orderData.token,
          "Content-Type": "application/json",
        },
      },
    );
    const jsonOrderResponse = await orderResponse.json();
    orderData.orderID = jsonOrderResponse.orders[0];

    console.log(jsonOrderResponse);
    return orderData;
  }
}
