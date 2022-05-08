import express, { Application, Request, Response } from "express";
import { EnvironmentsHelper } from "./helpers/environments.helper";
import axios from "axios";

interface Route {
  origin: string;
  target: string;
  method: any;
}

type Routes = Route[];

class App {
  expressApp: Application;

  routes: Routes = [
    {
      origin: "/api/order",
      target: `${EnvironmentsHelper.pathMSOrder}/order`,
      method: "post",
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
  }

  mountRoutes() {
    this.routes.forEach((route) => {
      let myRouteFun;
      switch (route.method.toLowerCase()) {
        case "get":
          this.expressApp.get(route.origin, this.functionCustom(route));
          break;
        case "post":
          myRouteFun = this.expressApp.post(
            route.origin,
            this.functionCustom(route)
          );
          break;
        case "put":
          myRouteFun = this.expressApp.put(
            route.origin,
            this.functionCustom(route)
          );
          break;
        case "delete":
          myRouteFun = this.expressApp.delete(
            route.origin,
            (route: Route) => {
              return (req: Request, res: Response) => {
                console.log(route.target)
                res.send("Delete");
              }
            }()
            //this.functionCustom(route)
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
}

export default new App().expressApp;
