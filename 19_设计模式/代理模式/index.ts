import { User } from "../发布订阅模式/index";

class User2 extends User {
  online() {
    this.status = "online";
  }
}

/* 用代理模式实现用户状态订阅 */
export const createProxyUser = (name: string) => {
  const user = new User2(name);
  const proxyUser = new Proxy(user, {
    set: (target, prop: keyof User2, value) => {
      target[prop] = value;
      if (prop === "status") {
        notifyStatusHandler(target, value);
      }

      return true;
    },
  });

  const notifyStatusHandler = (user: User2, status: "online" | "offline") => {
    if (status === "online") {
      user.followers.forEach(({ notify }) => {
        notify(user);
      });
    }
  };

  return proxyUser;
};
