import { User } from "../发布订阅模式/index";

/* 用原型模式创建上线订阅的用户 */
const baseUser: User = {
  name: "",
  status: "offline",
  followers: [],
  subscribe(user, notify) {
    user.followers.push({ user, notify });
  },

  online() {
    this.status = "online";
    this.followers.forEach(({ notify }) => {
      notify(this);
    });
  },
};

export const createUser = (name: string) => {
  const user: User = Object.create(baseUser);
  user.name = name;
  user.followers = [];

  return user;
};
