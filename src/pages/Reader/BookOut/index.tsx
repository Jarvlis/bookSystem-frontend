import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { BookBorrowReturn, getAllBorrowInfo } from '@/services/ant-design-pro/api';
// @ts-ignore
import { message } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const BookIn: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const actionRef = useRef<ActionType>();
  const handleClick = (record: API.BookBorrow) => {
    // 在这里添加你的事件处理代码
    return async () => {
      const res = await BookBorrowReturn(record);
      if (res) {
        message.success('归还申请成功');
        actionRef.current?.reload();
      } else {
        message.error('归还申请失败');
      }
    };
  };

  const baseColumn: ProColumns<API.BookBorrow>[] = [
    {
      title: '借阅ID',
      dataIndex: 'borrowid',
    },
    {
      title: '图书ID',
      dataIndex: 'bookid',
    },
    {
      title: '用户ID',
      dataIndex: 'userid',
    },
    {
      title: '借阅时间',
      dataIndex: 'borrowtime',
      valueType: 'date',
    },
    {
      title: '归还时间',
      dataIndex: 'returntime',
      valueType: 'date',
    },
    {
      title: '所属单位ID',
      dataIndex: 'deptid',
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
    },
    {
      title: '借入状态',
      key: 'borrowstatus',
      dataIndex: 'borrowstatus',
      valueType: 'select',
      valueEnum: {
        0: { text: '待审核', status: 'Error' },
        1: { text: '已借入', status: 'Success' },
        2: { text: '已拒绝', status: 'Error' },
        3: { text: '已归还', status: 'Success' },
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      width: 60,
      render: (text, record) => [
        <a key="link" onClick={handleClick(record)}>
          归还
        </a>,
      ],
    },
  ];

  const columnsMap: Record<string, ProColumns<API.BookBorrow>[]> = {
    toCheck: baseColumn,
    Checked: baseColumn,
    Over: [
      {
        title: '借阅ID',
        dataIndex: 'borrowid',
      },
      {
        title: '图书ID',
        dataIndex: 'bookid',
      },
      {
        title: '用户ID',
        dataIndex: 'userid',
      },
      {
        title: '借阅时间',
        dataIndex: 'borrowtime',
        valueType: 'date',
      },
      {
        title: '归还时间',
        dataIndex: 'returntime',
        valueType: 'date',
      },
      {
        title: '所属单位ID',
        dataIndex: 'deptid',
      },
      {
        title: '申请理由',
        dataIndex: 'reason',
      },
      {
        title: '联系方式',
        dataIndex: 'contact',
      },
      {
        title: '备注',
        dataIndex: 'remarks',
      },
      {
        title: '借入状态',
        key: 'borrowstatus',
        dataIndex: 'borrowstatus',
        valueType: 'select',
        valueEnum: {
          0: { text: '待审核', status: 'Error' },
          1: { text: '已借入', status: 'Success' },
          2: { text: '已拒绝', status: 'Error' },
          3: { text: '已归还', status: 'Success' },
        },
      },
    ],
  };

  const [activeKey, setActiveKey] = useState<string>('toCheck');

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    actionRef.current?.reload(); // 刷新表单
  };

  return (
    <ProTable<API.BookBorrow>
      columns={columnsMap[activeKey]}
      actionRef={actionRef}
      //@ts-ignore
      request={async () => {
        const tableList = await getAllBorrowInfo();
        let resList = [];
        // @ts-ignore
        resList = tableList.filter(
          (item: API.BookBorrow) => item.userid === currentUser?.userid && item.returntime !== null,
        );
        if (activeKey === 'toCheck') {
          //@ts-ignore
          resList = resList.filter((item: API.BookBorrow) => item.borrowstatus === 1);
        } else if (activeKey === 'Over') {
          //@ts-ignore
          resList = resList.filter(
            (item: API.BookBorrow) => item.borrowstatus === 2 || item.borrowstatus === 3,
          );
        }
        return Promise.resolve({
          data: resList,
          success: true,
        });
      }}
      toolbar={{
        title: '归还图书',
        multipleLine: true,
        tabs: {
          activeKey,
          onChange: (key) => handleTabChange(key),
          items: [
            {
              key: 'toCheck',
              tab: '待审核',
            },
            {
              key: 'Over',
              tab: '已结束',
            },
          ],
        },
      }}
      rowKey="key"
      search={false}
    />
  );
};
export default BookIn;
//@ts-ignore
