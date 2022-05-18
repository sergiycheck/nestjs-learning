export default () => {
  const configObj = {
    port: parseInt(process.env.PORT, 10) || 3010,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432, //postgres port
    },
  };
  console.log('config object', configObj);
  return configObj;
};
