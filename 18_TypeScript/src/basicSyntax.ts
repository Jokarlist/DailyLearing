/* 基础语法 */

/**
 * 声明一个对象的类型时，有两个主要的工具：
 * 1、接口（interface）
 * 2、类型别名（type aliases）
 * 他们非常相似，并且在大多数情况下是相同的
 */

/* 1、对象类型 */
interface IBytedancer {
  // 只读属性：约束属性不可在对象初始化外赋值
  readonly jobId: number;
  name: string;
  sex: "male" | "female" | "other";
  age: number;
  // 可选属性：定义该属性可以不存在
  hobby?: string;
  // 任意属性：约束所有对象属性都必须是该属性的子类型
  [key: string]: any;
}

const bytedancer: IBytedancer = {
  jobId: 2333,
  name: "xiang",
  sex: "male",
  age: 21,
  hobby: "coding",
};

// 报错：无法分配到 "jobId" ，因为它是只读属性
// bytedancer.jobId = 9527;

// 成功：任意属性标注下可以添加任意属性
// bytedancer.platform = "data";

// 报错：缺少属性 "name"，但类型 "IBytedancer" 中需要该属性
/* const bytedancer2: IBytedancer = {
  jobId: 23333,
  sex: "female",
  age: 21,
}; */

/* 2、函数类型 */
function add(x: number, y: number): number {
  return x + y;
}

const mult: (x: number, y: number) => number = (x, y) => x * y;

interface IMult {
  (x: number, y: number): number;
}

const mult2: IMult = (x, y) => x * y;

// 对getDate函数进行重载，timestamp为可缺省参数
function getDate(type: "string", timestamp?: string): string;
function getDate(type: "date", timestamp?: string): Date;
function getDate(type: "string" | "date", timestamp?: string): Date | string {
  const date = new Date(timestamp);
  return type === "string" ? date.toLocaleString() : date;
}

const x = getDate("date"); // x: Date
const y = getDate("string", "2022-08-02"); // y: string

interface IGetDate {
  // (type: "string", timestamp?: string): string;
  (type: "string", timestamp?: string): any;
  // (type: "date", timestamp?: string): Date;
  (type: "date", timestamp?: string): any;
  (type: "string" | "date", timestamp?: string): Date | string;
}

/**
 * 报错：
 * 不能将类型“(type: any, timestamp: any) => string | Date”分配给类型“IGetDate”。
 * 不能将类型“string | Date”分配给类型“string”。
 * 不能将类型“Date”分配给类型“string”
 * 修改：
 * 需要将函数重载的范围大于使用时的范围，修改如上所示
 */
const getDate2: IGetDate = (type, timestamp) => {
  const date = new Date(timestamp);
  return type === "string" ? date.toLocaleString() : date;
};

/* 3、数组类型 */
// 「类型+方括号」表示
type IArr1 = number[];
// 泛型表示
type IArr2 = Array<number | string | Record<string, number>>;
// 元组表示
type IArr3 = [number, number, string, string];
// 接口表示
interface IArr4 {
  [key: number]: any;
}

const arr1: IArr1 = [1, 2, 3, 4, 5, 6];
const arr2: IArr2 = [1, 2, "3", "4", { a: 1 }];
const arr3: IArr3 = [1, 2, "3", "4"];
const arr4: IArr4 = ["string", () => null, {}, []];

/* 4、补充类型 */
// 空类型，表示无赋值
type IEmptyFunction = () => void;
// 任意类型，是所有类型的子类型
type IAnyType = any;
// 枚举类型：支持枚举值到枚举名的正、反向映射
enum EnumExample {
  add = "+",
  mult = "*",
}

EnumExample["add"] === "+";
EnumExample["+"] === "add";

enum EDay {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun,
}

EDay["Mon"] === 0;
EDay[0] === "Mon";

/* 5、泛型 */
// 不预先指定具体的类型，而在使用的时候再指定类型的一种特性
type IGetRepeatArrR = <T>(target: T) => T[];

// 泛型接口 & 多泛型
interface IX<T, U> {
  key: T;
  val: U;
}
// 泛型类
class IMan<T> {
  instance: T;
}
// 泛型别名
type ITypeArr<T> = Array<T>;
// 报错：类型“string”的参数不能赋给类型“number”的参数
// const typeArr: ITypeArr<number> = Array.of(1, "2");

// 泛型约束：限制泛型必须符合字符串
type IGetRepeatStringArr = <T extends string>(target: T) => T[];
const getRepeatStringArr: IGetRepeatStringArr = (target) =>
  new Array(100).fill(target);
// 报错：类型“number”的参数不能赋给类型“string”的参数
// getRepeatStringArr(123);

// 泛型参数默认类型
type IGetRepeatArr<T = number> = (target: T) => T[];
const getRepeatArr: IGetRepeatArr = (target) => new Array(100).fill(target);
// 报错：类型“string”的参数不能赋给类型“number”的参数
// getRepeatArr('123');

/* 6、类型别名 & 类型断言 */
// 通过 type 关键字定义了 IObjArr 的别名类型
type IObjArr = Array<{
  key: string;
  [objKey: string]: any;
}>;

function keyBy<T extends IObjArr>(objArr: Array<T>) {
  // 未指定类型时，result 的类型为 {}
  const result = objArr.reduce((prev, next, key) => {
    prev[key] = next;
    return prev;
  }, {});
  // 通过 as 关键字，断言 result 类型为正确类型
  return result as Record<string, T>;
}

/* 7、字符串/数字字面量 */
// IDomTag 的值必须为"html"、"body"、"div"、"span"之一
type IDomTag = "html" | "body" | "div" | "span";
// IOddNumber的值必须为1、3、5、7、9之一
type IOddNumber = 1 | 3 | 5 | 7 | 9;
