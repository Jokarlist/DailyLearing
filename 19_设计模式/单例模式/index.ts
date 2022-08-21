import { api } from "./utils";

/* 用单例模式实现请求缓存 */

// 其它面向对象的语言一般如下列做法，定义类再实现单例模式
export class Request {
  static instance: Request;
  private cache: Record<string, string>;
  constructor() {
    this.cache = {};
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Request();
    }

    return this.instance;
  }

  public async request(url: string) {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const response = await api(url);
    this.cache[url] = response;

    return response;
  }
}

// 因为 js 中可以定义对象字面量的形式来创建一个对象，所以可以不用定义类来实现单例模式
const cache: Record<string, string> = {};

export const request = async (url: string) => {
  if (cache[url]) {
    return cache[url];
  }

  const response = await api(url);
  cache[url] = response;
  return response;
};
