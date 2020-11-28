import cors from "cors";
import express, { Express } from "express";
import { romanNumberRouter } from "./routes/roman-number.routes";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    this.app
      .use(cors())
      .use(romanNumberRouter);
  }
}

export default new App().app;
