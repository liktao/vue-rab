import httpInstance from "@/utils/http";

export function getBannerAPI(query = {}) {
  // 默认为1 商品为2
  const {distributionSite='1'} = query
  return httpInstance({
    url: `/home/banner?distributionSite=${distributionSite}`,

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
