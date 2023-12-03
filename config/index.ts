import databaseConfig from "./database";
import servicesConfig from "./services";
import sessionConfig from "./session";

const config = {
  databaseConfig,
  servicesConfig,
  sessionConfig,
  debug: true,
  jwt: {
    secretKey: "nhd@sd3budsb&^^%$hgdvyst#@av7s",
  },
};

export default config;
