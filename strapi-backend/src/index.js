module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set public permissions for Products and Articles
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permissions = await strapi.entityService.findMany(
        'plugin::users-permissions.permission',
        {
          filters: {
            role: publicRole.id,
            action: {
              $in: ['api::product.product.find', 'api::product.product.findOne', 'api::article.article.find', 'api::article.article.findOne'],
            },
          },
        }
      );

      for (const permission of permissions) {
        await strapi.entityService.update(
          'plugin::users-permissions.permission',
          permission.id,
          { data: { enabled: true } }
        );
      }

      console.log('✅ Public API permissions configured for Products and Articles');
    }
  },
};
