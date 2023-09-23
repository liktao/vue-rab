import httpInstance from "@/utils/http";

export function getBannerAPI() {
  return httpInstance({
    url: "/home/banner",
    // get请求不用写
    // method:'GET'
  });
}

export function getNewAPI() {
  return httpInstance({
    url: "/home/new",
  });
}

export function getHotAPI() {
  return httpInstance({
    url: "/home/hot",
  });
}

export function getGoodAPI() {
  return httpInstance({
    url: "/home/goods",
  });
}
