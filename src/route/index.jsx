import appRouter from "./appRouter";
import authRouter from "./authRouter";
import entrepriseRouter from "./entrepriseRouter";

const index = [
  ...entrepriseRouter,
  ...appRouter,
  ...authRouter,
];

export default index;
