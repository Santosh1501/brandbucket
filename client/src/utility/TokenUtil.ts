import axios from "axios";

export class TokenUtil {
    public static setTokenHeader(token: string) {
        if (token) {
            axios.defaults.headers.common['token'] = token
        }
        else {
            delete axios.defaults.headers.common['token']
        }
    }
}