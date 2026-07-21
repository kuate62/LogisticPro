import appRouter from "./appRouter";
import authRouter from "./authRouter";
import landingRouter from "./landingRouter";

const index = [
  ...landingRouter,
  ...appRouter,
  ...authRouter,
];

export default index;
