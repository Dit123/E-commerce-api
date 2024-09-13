import Randomstring from "randomstring";

export const createOtp = Randomstring.generate({
    length:4,
    charset:"numeric"
});