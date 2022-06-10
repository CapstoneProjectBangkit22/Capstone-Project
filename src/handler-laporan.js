const reportRepository = require('./repository/report-repository');

const laporanUser = async (request, h) => {
  const { subject, name, laporan } = request.payload;

  const newLaporan = {
    subject,
    name,
    laporan,
  };

  const report = await reportRepository.save(newLaporan);
  const response = h.response(report);
  response.code(201);
  return response;
};

const getLaporan = async (request, h) => {
  const { subject, name, laporan } = request.query;

  const reports = await reportRepository.findAll({ subject, name, laporan });

  const response = h.response({
    laporans: reports,
  });
  response.code(200);
  return response;
};

module.exports = {
  laporanUser,
  getLaporan,
};
