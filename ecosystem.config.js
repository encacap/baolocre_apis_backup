module.exports = {
  apps: [
    {
      name: 'baolocre_apis_dev',
      script: 'yarn',
      args: 'start:prod',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
