const superagent = require('superagent');

const commentRepository = require('./repository/comment-repository');

const komenUser = async (request, h) => {
  const { komen } = request.payload;

  const { content, createdAt } = await commentRepository.save(komen);

  const res = await superagent
    .post(`${process.env.ML_API_HOST}/predict`)
    .send({ sentences: komen })
    .set('accept', 'json');

  const { label } = res.body;

  if (label !== 'POSITIF') {
    return h.response({
      label,
      message: 'Komen gagal ditambahkan',
      name: 'Anonymous',
      komen: '',
      createAt: new Date().toISOString(),
    });
  }

  const response = h.response({
    label,
    message: 'Komen Berhasil Dimasukkan',
    name: 'Anonymous',
    komen: content,
    createAt: createdAt,
  });
  response.code(201);
  return response;
};

const getKomen = async (request, h) => {
  const comments = await commentRepository.findAll();

  const response = h.response({
    komens: comments.map((comment) => ({
      label: 'Positif',
      name: 'Anonymous',
      komen: comment.content,
      createAt: comment.createdAt,
    })),
  });
  response.code(200);
  return response;
};

module.exports = {
  komenUser,
  getKomen,
};
