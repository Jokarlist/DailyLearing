/**
 * 获取所有省份的数据
 */
export async function getProvinces() {
  return await fetch("/api/local").then((res) => res.json());
}

export async function getCities(parentId) {
  const url = `/api/local?parentId=${parentId}`;

  return await fetch(url).then((res) => res.json());
}
