import { Request, Response } from "express";
import AuthApplication from "../../application/auth.application";

export default class AuthController {
  constructor(private application: AuthApplication) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
    this.validateAccessToken = this.validateAccessToken.bind(this);
  }

  async register(req: Request, res: Response) {
    const auth = req.body;
    console.log("controller", auth);
    await this.application.register(auth);
    res.sendStatus(200);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const tokens = await this.application.login(email, password);
    res.json(tokens);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const tokens = await this.application.getNewAccessToken(refreshToken);
    res.json(tokens);
  }

  async validateAccessToken(req: Request, res: Response) {
    const { accessToken } = req.body;
    const isValid = await this.application.validateAccessToken(accessToken);
    res.json({ isValid });
  }
}
