// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    userid: string;
    accountstatus?: number;
    address?: string;
    avatarpath?: string;
    contactphone?: string;
    createtime?: string;
    email?: string;
    gender?: string;
    isregistered?: string;
    lastlogintime?: string;
    realname?: string;
    username?: string;
    workid?: string;
    roleName?: string;
    deptid?: number;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type Dept = {
    deptid: number;
    deptname?: string;
    contact?: string;
    contactphone?: string;
    email?: string;
    address?: string;
    property?: string;
  };

  type ResetParams = {
    username?: string;
    email?: string;
    contact?: string;
    contactphone?: string;
    password?: string;
    deptid?: number;
  };

  type BookFlow = {
    flowid?: number;
    bookid?: number;
    flowtime?: Date | string;
    returntime?: Date | string;
    ownerunit?: number;
    flowtounit?: number;
    reason?: string;
    applicant?: string;
    contact?: string;
    remarks?: string;
    flowstatus?: number;
    //0 - 待审核, 1 - 已借入, 2 - 已拒绝, 3 - 已结束
  };

  type BookBorrow = {
    borrowid?: number;
    userid?: number;
    bookid?: number;
    borrowtime?: Date | string;
    returntime?: Date | string;
    deptid: number;
    reason?: string;
    contact?: string;
    remarks?: string;
    borrowstatus?: number;
    //0 - 待审核, 1 - 已借出, 2 - 已绝, 3 - 已结束
  };

  type Book = {
    bookid: number;
    bookname?: string;
    publishtime?: Date | string;
    author?: string;
    publisher?: string;
    category?: string;
    pages?: string;
    price?: string;
    picturepath?: string;
    bookstatus: number;
    deptid: number;
  };

  type BookSearch = {
    bookid?: number;
    bookname?: string;
    author?: string;
    publisher?: string;
  };

  type DeptRegister = {
    deptname?: string;
    contact?: string;
    contactphone?: string;
    email?: string;
    address?: string;
    property?: string;
  };

  type BookRegister = {
    bookname?: string;
    publishtime?: Date | string;
    author?: string;
    publisher?: string;
    category?: string;
    pages?: string;
    price?: string;
    picturepath?: string;
    deptid?: number;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  /**
   * 通用返回类
   */
  type BaseResponse<T> = {
    code: number;
    data: T;
    message: string;
    description: string;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userName?: string;
    userPassword?: string;
    type?: string;
  };

  type RegisterParams = {
    username: string;
    password: string;
    checkPassword?: string;
    email: string;
    contactphone?: string;
    realname: string;
    address: string;
    deptid?: string;
  };

  type SearchUser = {
    UserID?: number;
    Username?: string;
    phone?: string;
    pageSize?: number;
    current?: number;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
