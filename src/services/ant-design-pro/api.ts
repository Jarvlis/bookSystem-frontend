// @ts-ignore
/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 详情注册接口 POST /api/user/detailRegister */
export async function detailRegister(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/detailRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 搜索用户 POST /api/user/search */
export async function searchUsers(body: API.SearchUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 保存规则 POST /api/user/save */
export async function saveUsers(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除规则 POST /api/user/delete */
export async function deleteUsers(id: string, options?: { [p: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id },
    ...(options || {}),
  });
}

/**
 * 删除图书 POST /api/book/list
 */
export async function deleteBook(id: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/book/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { id },
    ...(options || {}),
  });
}

/**
 * 删除部门 POST /api/department/list
 */
export async function deleteDept(deptid: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/department/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { deptid },
    ...(options || {}),
  });
}

/**
 * 保存图书 POST /api/book/list
 */
export async function saveBook(body: API.Book, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/book/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 保存部门信息 POST /api/book/list
 */
export async function saveDept(body: API.Dept, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/department/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function BookRegister(body: API.BookRegister, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/book/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function DeptRegister(body: API.DeptRegister, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/department/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 图书流入申请
 * @param body
 * @param options
 * @constructor
 */
export async function BookFlowApply(body: API.BookFlow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/flow/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 图书借阅申请
 * @param body
 * @param options
 * @constructor
 */
export async function BookBorrowApply(body: API.BookBorrow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/borrow/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 图书归还
 * @param body
 * @param options
 * @constructor
 */
export async function BookFlowReturn(body: API.BookFlow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/flow/return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 借阅图书归还
 * @param body
 * @param options
 * @constructor
 */
export async function BookBorrowReturn(body: API.BookBorrow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/borrow/return', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 拒绝流出
 * @param body
 * @param options
 * @constructor
 */
export async function BookFlowReject(body: API.BookFlow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/flow/refuse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 拒绝借阅
 * @param body
 * @param options
 * @constructor
 */
export async function BookBorrowReject(body: API.BookBorrow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/borrow/refuse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 同意流入
 * @param body
 * @param options
 * @constructor
 */
export async function BookFlowIn(body: API.BookFlow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/flow/allow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 同意借阅
 * @param body
 * @param options
 * @constructor
 */
export async function BookBorrowIn(body: API.BookBorrow, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/borrow/allow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * 获取图书列表 POST /api/book/list
 */
export async function getBooksInfo(body: API.BookSearch, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.Book[]>>('/api/book/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

/**
 * 获取流动图书列表 POST /api/flow/list
 */
export async function getFlowInfo(options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.BookFlow[]>>('/api/flow/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    ...(options || {}),
  });
}

/**
 * 获取借阅图书列表 POST /api/flow/list
 */
export async function getBorrowInfo(deptid?: number | undefined, options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.BookBorrow[]>>('/api/borrow/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      deptid,
    },
    ...(options || {}),
  });
}

/**
 * 获取借阅图书列表 GET /api/flow/list
 */
export async function getAllBorrowInfo(options?: { [p: string]: any }) {
  return request<API.BaseResponse<API.BookBorrow[]>>('/api/borrow/readerlist', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

/**
 * 获取单位列表 POST /api/department/list
 */
export async function getDepartments(deptname?: string, options?: { [key: string]: any }) {
  return request<API.Dept[]>('/api/department/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      deptname,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
