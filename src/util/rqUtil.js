// 引入qrcode-decoder
import QrCode from 'qrcode-decoder/dist/index'

// 传入file对象，返回promise
export function getQrUrl(file) {
  // 获取临时路径 chrome有效，其他浏览器的方法请自行查找
  const url = window.webkitURL.createObjectURL(file)
  // 初始化
  const qr = new QrCode()
  // 解析二维码，返回promise
  return qr.decodeFromImage(url)
}
