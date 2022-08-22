import request from "../http.js";

export const getLabelList = data => request({
	name: "getLabelList",
	data
});
