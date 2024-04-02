import {str, num, bool, url, cleanEnv } from 'envalid'
import pkg from "../../package.json";

//keep environments needed for application
const opts = {
    API_REQUEST_TIMEOUT: num({default: 60000}),
    // ENVIRONMENT: str({
    //     choices: ['development', 'staging', 'production'],
    //     devDefault: 'production'
    // }),
    API_HOST: url({default: 'https://influozy.com/'})
}

console.log('ENVIRONMENT variable value:123123', process.env );

const env = cleanEnv(
    process.env,
    opts,
    { dotEnvPath: null }
)

export default env