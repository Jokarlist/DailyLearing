/* 高级类型 */

/**
 * 1、联合/交叉类型
 * 联合类型：IA | IB；联合类型表示一个值可以是几种类型之一
 * 交叉类型：IA & IB；多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
 */
const bookList = [
  {
    author: "xiaoming",
    type: "history",
    era: "2001-2022",
  },
  {
    author: "xiaohong",
    type: "story",
    theme: "love",
  },
];

type IBookList = Array<
  { author: string } & (
    | { type: "history"; era: string }
    | { type: "love"; theme: string }
  )
>;

/* 2、类型保护 & 类型守卫 */
interface IA {
  a: 1;
  a1: 2;
}

interface IB {
  b: 1;
  b1: 2;
}

/**
 * 报错：
 * 1、类型“IA | IB”上不存在属性“a1”
 * 2、类型“IB”上不存在属性“a1”
 * 结论：
 * 访问联合类型时，出于程序安全，仅能访问联合类型中的交集部分
 */
/* function log(arg: IA | IB) {
  if (arg.a) {
    console.log(arg.a1);
  } else {
    console.log(arg.b1);
  }
} */

// 类型守卫：定义一个函数，它的返回值是一个类型谓词，生效范围为子作用域
function getIsIA(arg: IA | IB): arg is IA {
  return !!(arg as IA).a;
}

function log(arg: IA | IB) {
  if (getIsIA(arg)) {
    // 此时在这个 if 的子作用域中，arg 类型被判断为 IA
    console.log(arg.a1);
  } else {
    // 在这个子作用域中，arg 类型被判断为 IB
    console.log(arg.b1);
  }
}

// 实现函数 reverse，其可将字符串和数组反转
function reverse(target: string | Array<any>) {
  // typeof 类型保护
  if (typeof target === "string") {
    return target.split("").reverse().join("");
  }

  // instanceof 类型保护
  if (target instanceof Array) {
    return target.reverse();
  }
}

// 实现函数 logBook 类型，函数接受书本类型，并 log 出相关特征
type IBookItem = { author: string } & (
  | { type: "history"; era: string }
  | { type: "love"; theme: string }
);

function logBook(book: IBookItem) {
  // 联合类型 + 类型保护 = 自动类型推断
  if (book.type === "history") {
    console.log(book.era);
  } else {
    console.log(book.theme);
  }
}

// 实现 merge 函数，要求 sourceObj 必须为 targetObj 的子集
function merge(sourceObj, targetObj) {
  const result = { ...sourceObj };
  for (const key in targetObj) {
    const itemVal = targetObj[key];
    itemVal && (result[key] = itemVal);
  }

  return result;
}

function merge2(sourceObj, targetObj) {
  return { ...sourceObj, ...targetObj };
}

interface ISourceObj {
  x?: string;
  y?: string;
}

interface ITargetObj {
  x: string;
  y: string;
}

type IMerge = (sourceObj: ISourceObj, targetObj: ITargetObj) => ITargetObj;
// 类型实现繁琐：若 obj 类型较为复杂，则声明 source 和 target 便需要大量重复2遍
// 容易出错：若 target 增加/减少 key,则需要 source 联动去除

interface IMerge2 {
  <T extends Record<string, any>>(sourceObj: Partial<T>, targetObj: T): T;
}

// 实现内置类型别名 Partial
type IPartial<T extends Record<string, any>> = {
  [P in keyof T]?: T[P];
};

// 索引类型：关键字 keyof，其相当于取值对象中所有 key 组成的字符串字面量
type IKeys = keyof { a: string; b: number }; // => type IKeys = "a" | "b"
// 关键字 in，其相当于字符串字面量中的一种可能取值，配合泛型 P，即表示每个 key
// 关键字 ？，通过设定对象可选选项，即可自动推导出子集类型

// 实现函数 delayCall 的类型声明
// delayCall 接受一个函数作为入参，其实现延迟 1s 运行函数
// 其返回 promise，结果为入参函数的返回结果
function delayCall(func) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = func();
      resolve(res);
    }, 1000);
  });
}

type IDelayCall = <T extends () => any>(func: T) => ReturnType<T>;

// 实现内置类型别名 ReturnType
type IReturnType<T extends (...arg: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

// 关键字 extends 跟随泛型出现时（在定义泛型时出现而不是在声明泛型时出现），表示类型推断，其表达可类
// 比三元不等式。如 T === 判断类型 ? 类型A : 类型 B

// 关键字 infer 出现在类型推断中，表示定义类型变量，可以用于指代类型
// 如该场景下，将函数的返回值类型作为变量，使用新泛型 R 定义，使用在类型推断命中的结果中
