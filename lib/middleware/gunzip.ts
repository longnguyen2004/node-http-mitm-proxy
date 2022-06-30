import zlib from "zlib";

export default {
  onResponse(ctx, callback) {
    if (
      ctx.serverToProxyResponse.headers["content-encoding"] &&
      ctx.serverToProxyResponse.headers["content-encoding"].toLowerCase() == "gzip"
    ) {
      delete ctx.serverToProxyResponse.headers["content-encoding"];
      ctx.addResponseFilter(zlib.createGunzip());
    }
    return callback();
  },
  onRequest(ctx, callback) {
    ctx.proxyToServerRequestOptions.headers["accept-encoding"] = "gzip";
    return callback();
  },
};
