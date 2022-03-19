import { provideStore as provideLoginUserStore } from "./loginUser";

export default function (app) {
  provideLoginUserStore(app);
}
