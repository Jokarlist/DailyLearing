import { getCities } from "../util/areaService";
import $ from "jquery";
import qs from "query-string";

const parsed = qs.parse(location.search);

$(".title").text(parsed.name);

const dl = $("dl");

getCities(parsed.id).then((cs) => {
  for (const c of cs) {
    $("<dd>").text(c.areaName).appendTo(dl);
  }
});
