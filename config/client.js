const {THEME} = process.env;
const theme = THEME || 'default';

const Layout = require(`manifold/themes/${ theme }/layout`);
const AdminLayout = require(`manifold/themes/${ theme }/admin-layout`);

export default { Layout, AdminLayout };
