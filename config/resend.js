import { Resend } from "resend";

let resend;

const resendConfig = () => {
  resend = new Resend(process.env.RESEND_API_KEY);
};

export { resend };
export default resendConfig;