module.exports = {
  apps: [{
    name: 'base-tgwx',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      PASSWORD: 'WaxSystem',
      JWT_SECRET_KEY: 'AAATESTKEY',
      JWT_REFRESH_SECRET_KEY: 'AAAREFRESHTESTKEY'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    restart_delay: 1000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
