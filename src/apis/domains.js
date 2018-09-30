import config from '../../config/index'

const isProdEnv = /timrchen\.site/.test(window.location.host)
const timDomain = isProdEnv ? config.build.timDomain : config.dev.timDomain;

export default timDomain;
