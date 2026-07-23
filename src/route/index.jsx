import appRouter from "./appRouter";
import authRouter from "./authRouter";
import publicRouter from "./publicRouter";

const index = [
  ...publicRouter,
  ...appRouter,
  ...authRouter,
];

export default index;
