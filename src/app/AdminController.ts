import { Application, Router, RouterContext } from "../../deps/index.ts";

import AdminService from "./AdminService.ts";

export default class AdminController {
  constructor(private adminService: AdminService) {}

  useWith(app: Application) {
    const router = new Router({ prefix: "/admin/" })
      .get("resetTxs", this.resetTxs.bind(this))
      .get("sendBatch", this.sendBatch.bind(this));

    app.use(router.routes());
    app.use(router.allowedMethods());
  }

  async resetTxs(context: RouterContext) {
    await this.adminService.resetTxs();
    context.response.body = "Transactions reset";
  }

  async sendBatch(context: RouterContext) {
    await this.adminService.sendBatch();
    context.response.body = "Sent batch of transactions";
  }
}