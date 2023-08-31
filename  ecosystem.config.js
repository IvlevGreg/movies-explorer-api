module.exports = {
  apps: [{
    name: 'server',
    script: './src/app.js',
    node_args: '-r esm',
  }],
};
