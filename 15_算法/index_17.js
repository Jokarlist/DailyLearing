class Node {
  constructor(value) {
    this.value = value;
    this.neighbor = [];
  }
}

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");

const max = 10000;
const nodeSet = [a, b, c, d, e];
const weights = [
  [0, 4, 7, max, max],
  [4, 0, 8, 6, max],
  [7, 8, 0, 5, max],
  [max, 6, 5, 0, 7],
  [max, max, max, 7, 0],
];

/**
 * 获取起始节点的最小权重路径对应的另一节点
 * @param {Array} nodeSet 存储所有节点的数组
 * @param {Array} weights 存储节点间的所有路径的权重的数组
 * @param {Array} curNodeSet 存储已连通节点的数组
 */
function getMinWeightNode(nodeSet, weights, curNodeSet) {
  // 寻找最小权重路径所用到的起始节点
  let beginNode = null;
  // 起始节点的最小权重路径对应的另一节点
  let minWeightNode = null;
  // 用于比较的最小权重
  let minWeight = max;
  // 遍历curNodeSet的所有节点，以其为起点依次判断与其它点的距离（路径权重）
  for (let i = 0; i < curNodeSet.length; i++) {
    // curNodeSet中的单个节点所对应的所有路径的权重
    const weight = weights[nodeSet.indexOf(curNodeSet[i])];
    // 遍历上述所有路径的权重
    for (let j = 0; j < weight.length; j++) {
      // 只有当该节点还未连通，且与起点之间的距离为当前的最短距离（即最短路径权重）才进入此分支
      if (curNodeSet.indexOf(nodeSet[j]) < 0 && weight[j] < minWeight) {
        // 修改用于比较的最小权重
        minWeight = weight[j];
        // 修改最小路径权重对应的另一节点
        minWeightNode = nodeSet[j];
        // 修改起始节点
        beginNode = curNodeSet[i];
      }
    }
  }
  // 连通起始节点与这一次函数执行所找出的另一节点
  beginNode.neighbor.push(minWeightNode);
  minWeightNode.neighbor.push(beginNode);

  return minWeightNode;
}

/**
 * prim算法
 * @param {Array} nodeSet 存储所有节点的数组
 * @param {Array} weights 存储节点间的所有路径的权重的数组
 * @param {Object} beginNode prim算法初始时的节点
 */
function prim(nodeSet, weights, beginNode) {
  // 存储已连通节点的数组
  const curNodeSet = [];
  curNodeSet.push(beginNode);
  while (true) {
    // 获取起始节点的最小权重路径对应的另一节点
    const minWeightNode = getMinWeightNode(nodeSet, weights, curNodeSet);
    // 将该节点添加进已连通节点的数组
    curNodeSet.push(minWeightNode);
    if (curNodeSet.length === nodeSet.length) {
      return nodeSet;
    }
  }
}

// console.log(prim(nodeSet, weights, nodeSet[2]));

/**
 * 将kruskal算法寻找的边的两节点进行连接
 * @param {Array} existedList 已存在的“部落”数组
 * @param {Object} beginNode 连接起始节点
 * @param {Object} endNode 连接结束节点
 */
function link(existedList, beginNode, endNode) {
  let beginList = null;
  let endList = null;
  for (let i = 0; i < existedList.length; i++) {
    if (existedList[i].indexOf(beginNode) > -1) {
      beginList = existedList[i];
    }

    if (existedList[i].indexOf(endNode) > -1) {
      endList = existedList[i];
    }
  }
  // 没有不同的“部落”分别包含起始节点和结束节点
  if (!beginList && !endList) {
    existedList.push([beginNode, endNode]);
    // 有“部落”包含起始节点，没有“部落”包含结束节点
  } else if (beginList && !endList) {
    beginList.push(endNode);
    // 有“部落”包含结束节点，没有“部落”包含起始节点
  } else if (!beginList && endList) {
    endList.push(beginNode);
    // 有不同的“部落”分别包含起始节点和结束节点
  } else if (beginList && endList && beginList !== endList) {
    existedList.splice(existedList.indexOf(beginList), 1);
    existedList.splice(existedList.indexOf(endList), 1);
    existedList.push(beginList.concat(endList));
  }
  // 将起始节点和结束节点连通
  beginNode.neighbor.push(endNode);
  endNode.neighbor.push(beginNode);
}

/**
 * 判断kruskal算法寻找到的边的两节点能否连接
 * @param {Array} existedList 已存在的“部落”数组
 * @param {Object} tempBegin 暂时的连接起始节点
 * @param {Object} tempEnd 暂时的连接结束节点
 */
function canLink(existedList, tempBegin, tempEnd) {
  // 包含起始节点的已存在的“部落”
  let beginList = null;
  // 包含结束节点的已存在的“部落”
  let endList = null;
  // 遍历已存在“部落”的数组
  for (let i = 0; i < existedList.length; i++) {
    // 已存在“部落”中包含起始节点
    if (existedList[i].indexOf(tempBegin) > -1) {
      beginList = existedList[i];
    }
    // 已存在“部落”中包含结束节点
    if (existedList[i].indexOf(tempEnd) > -1) {
      endList = existedList[i];
    }
  }
  // 起始节点和结束节点都包含，且包含在同一个已存在“部落”的情况，直接返回false
  if (beginList && endList && endList === beginList) {
    return false;
  }
  // 其余情况返回true
  return true;
}

/**
 * kruskal算法
 * @param {Array} nodeSet 存储所有节点的数组
 * @param {Array} weights 存储节点间的所有路径的权重的数组
 */
function kruskal(nodeSet, weights) {
  // 存储已存在的“部落”的数组
  const existedList = [];
  while (true) {
    // 用于每次寻找最短路径时的比较基量
    let minWeight = max;
    // 寻找的路径的起始节点
    let beginNode = null;
    // 寻找的路径的结束节点
    let endNode = null;
    // 两重循环，遍历weights中的每一个weight中的路径，寻找最小路径
    for (let i = 0; i < weights.length; i++) {
      const tempBegin = nodeSet[i];
      for (let j = 0; j < weights[i].length; j++) {
        const tempEnd = nodeSet[j];
        // 寻找到的路径不是自身到自身的路径，路径值小于比较值，且canLink判断可以连接时才进入此分支
        if (
          i !== j &&
          weights[i][j] < minWeight &&
          canLink(existedList, tempBegin, tempEnd)
        ) {
          // 修改比较值、起始节点、结束节点
          minWeight = weights[i][j];
          beginNode = tempBegin;
          endNode = tempEnd;
        }
      }
    }
    // 按照寻找到的路径连接节点
    link(existedList, beginNode, endNode);
    // 出口条件
    if (existedList.length === 1 && existedList[0].length === nodeSet.length) {
      return nodeSet;
    }
  }
}

console.log(kruskal(nodeSet, weights));
