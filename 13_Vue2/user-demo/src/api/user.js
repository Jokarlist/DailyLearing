/**
 * 模拟网络通信的延迟函数
 * @param {number} duration
 */
function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

/**
 * 模拟登录过程
 * @param {string} loginId 用户id
 * @param {string} loginPwd 用户密码
 */
export async function login(loginId, loginPwd) {
  await delay(1000);

  if (loginId === "admin" && loginPwd === "123123") {
    const user = {
      loginId,
      name: "管理员",
    };

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  return null;
}

/**
 * 模拟注销过程
 */
export async function logout() {
  await delay(1000);
  localStorage.removeItem("user");
}

/**
 * 模拟登录恢复过程
 */
export async function whoAmI() {
  await delay(1000);
  const user = localStorage.getItem("user");

  // user有值表明已经登录
  if (user) {
    return JSON.parse(user);
  }

  return null;
}
