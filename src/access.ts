/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.roleName === '1',
    canStaff: currentUser && currentUser.roleName === '2',
    canReader: currentUser && currentUser.roleName === '3',
    cannotVisitor: currentUser && currentUser.roleName !== '0',
  };
}
