import httpInstance from "@/utils/http";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
    // get请求不用写
    // method:'GET'
  });
}
