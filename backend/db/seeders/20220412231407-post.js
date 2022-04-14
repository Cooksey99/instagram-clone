'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert('Posts', [
      {
      user_id: 1,
      image: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-05/26/3/campaign_images/webdr10/can-you-make-it-without-going-ew-2-820-1432626669-1_dblbig.jpg?resize=1200:*',
      caption: '* inspirational quote *',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      user_id: 1,
      image: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
      caption: '* inspirational quote *',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      user_id: 1,
      image: 'https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true',
      caption: '* inspirational quote *',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      user_id: 2,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      caption: 'Just a bird!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      user_id: 2,
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      caption: 'Took this beautiful shot on vacation!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
      user_id: 3,
      image: 'https://h5p.org/sites/default/files/h5p/content/1209180/images/file-6113d5f8845dc.jpeg',
      caption: 'Risked my life to share this with you lovely people.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
