const { laporanUser, getLaporan } = require('./handler-laporan');
const { komenUser, getKomen } = require('./handler-komen');

const routes = [
  {
    method: 'POST',
    path: '/laporan',
    handler: laporanUser,
  },

  {
    method: 'GET',
    path: '/laporan',
    handler: getLaporan,
  },
  {
    method: 'POST',
    path: '/komen',
    handler: komenUser,
  },
  {
    method: 'GET',
    path: '/komen',
    handler: getKomen,
  },
];

module.exports = routes;
