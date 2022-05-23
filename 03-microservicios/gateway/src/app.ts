import express, { Application, Request, Response } from "express";
import { EnvironmentsHelper } from "./helpers/environments.helper";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface Route {
  origin: string;
  target: string;
  method: any;
  middlewares: any[];
}

type Routes = Route[];

class App {
  expressApp: Application;

  routes: Routes = [
    {
      origin: "/api/order",
      target: `${EnvironmentsHelper.pathMSOrder}/order`,
      method: "post",
      middlewares: [this.authentication],
    },
    {
      origin: "/api/auth/register",
      target: `${EnvironmentsHelper.pathMSAuth}/auth/register`,
      method: "post",
      middlewares: [],
    },
    {
      origin: "/api/auth/login",
      target: `${EnvironmentsHelper.pathMSAuth}/auth/login`,
      method: "post",
      middlewares: [],
    },
    {
      origin: "/api/auth/get-new-access-token",
      target: `${EnvironmentsHelper.pathMSAuth}/auth/get-new-access-token`,
      method: "post",
      middlewares: [],
    },
  ];

  constructor() {
    this.functionCustom = this.functionCustom.bind(this);
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
  }

  middlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  mountRoutes() {
    this.routes.forEach((route) => {
      let myRouteFun;
      switch (route.method.toLowerCase()) {
        case "get":
          this.expressApp.get(
            route.origin,
            ...route.middlewares,
            this.functionCustom(route)
          );
          break;
        case "post":
          myRouteFun = this.expressApp.post(
            route.origin,
            ...route.middlewares,
            this.functionCustom(route)
          );
          break;
        case "put":
          myRouteFun = this.expressApp.put(
            route.origin,
            ...route.middlewares,
            this.functionCustom(route)
          );
          break;
      }
    });

    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }

  functionCustom(route: Route) {
    return async (req: Request, res: Response) => {
      try {
        const queryString = this.getParameters("querystring", req);

        const rqAxios: any = {
          method: route.method,
          url: route.target,
          responseType: "json",
        };

        if (queryString) {
          rqAxios.url += `?${queryString}`;
        }

        if (
          (route.method === "post" || route.method === "put") &&
          Object.keys(req.body).length > 0
        ) {
          rqAxios.data = req.body;
          if (res.locals.userId) {
            rqAxios.data.userId = res.locals.userId;
          }
        }

        const result = await axios(rqAxios);
        res.json(result.data);
      } catch (err) {
        console.log("An error ocurred");
        res.json({ err });
      }
    };
  }

  getParameters(typeParameters: string, req: Request): string {
    let params = "";

    switch (typeParameters) {
      case "querystring":
        for (let key in Object.keys(req.query)) {
          params += params
            ? `&${key}=${req.query[key]}`
            : `${key}=${req.query[key]}`;
        }
        break;
    }

    return params;
  }

  async authentication(req: Request, res: Response, next: any) {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({
        message: "Access token is missing",
      });
    }

    const elementsHeaderAuthorization = authorization.split(" ");

    if (elementsHeaderAuthorization.length !== 2) {
      return res.status(401).json({
        message: "Access token is missing",
      });
    }

    const [_, accessToken] = elementsHeaderAuthorization;

    const rqAxios: any = {
      method: "post",
      url: `${EnvironmentsHelper.pathMSAuth}/auth/validate-access-token`,
      responseType: "json",
      data: { accessToken },
    };
    const result = await axios(rqAxios);
    const response = result.data;

    if (!response.isValid) {
      return res.status(401).json({
        message: "Access token is missing",
      });
    }

    const payload: any = jwt_decode(accessToken);
    res.locals.userId = payload.id;

    return next();
  }
}

export default new App().expressApp;
