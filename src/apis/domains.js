import config from '../../config/index'

// Todo: 上线前将此处 IP 替换为 timrchen.site
const isProdEnv = /timrchen\.site/.test(window.location.host)
// const isProdEnv = /47\.93\.191\.225/.test(window.location.host);
const timDomain = isProdEnv ? config.build.timDomain : config.dev.timDomain

export default ({
  timDomain
})
