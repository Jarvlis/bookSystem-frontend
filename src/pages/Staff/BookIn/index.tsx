import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { BookFlowReturn, getFlowInfo } from '@/services/ant-design-pro/api';
import { useModel } from '@@/plugin-model/useModel';
import { message } from 'antd';

const BookIn: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const actionRef = useRef<ActionType>();
  const handleClick = (record: API.BookFlow) => {
    // 在这里添加你的事件处理代码
    return async () => {
      const res = await BookFlowReturn(record);
      if (res) {
        message.success('归还申请成功');
        setTimeout(() => {
          actionRef.current?.reload(); // 刷新表单
        }, 0);
        return true;
      } else {
        message.error('归还申请失败');
        return false;
      }
    };
  };

  const baseColumn: ProColumns<API.BookFlow>[] = [
    {
      title: '流入ID',
      dataIndex: 'flowid',
    },
    {
      title: '图书ID',
      dataIndex: 'bookid',
    },
    {
      title: '借阅时间',
      dataIndex: 'flowtime',
      valueType: 'date',
    },
    {
      title: '归还时间',
      dataIndex: 'returntime',
      valueType: 'date',
    },
    {
      title: '所属单位',
      dataIndex: 'ownerunit',
    },
    {
      title: '流入单位',
      dataIndex: 'flowtounit',
    },
    {
      title: '申请理由',
      dataIndex: 'reason',
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
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
      key: 'flowstatus',
      dataIndex: 'flowstatus',
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
      render: (text, record, index) => [
        <a key="link" onClick={handleClick(record)}>
          归还
        </a>,
      ],
    },
  ];

  const columnsMap: Record<string, ProColumns<API.BookFlow>[]> = {
    toCheck: baseColumn,
    Checked: baseColumn,
    Over: [
      {
        title: '流入ID',
        dataIndex: 'flowid',
      },
      {
        title: '图书ID',
        dataIndex: 'bookid',
      },
      {
        title: '借阅时间',
        dataIndex: 'flowtime',
        valueType: 'date',
      },
      {
        title: '归还时间',
        dataIndex: 'returntime',
        valueType: 'date',
      },
      {
        title: '所属单位',
        dataIndex: 'ownerunit',
      },
      {
        title: '流入单位',
        dataIndex: 'flowtounit',
      },
      {
        title: '申请理由',
        dataIndex: 'reason',
      },
      {
        title: '申请人',
        dataIndex: 'applicant',
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
        key: 'flowstatus',
        dataIndex: 'flowstatus',
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
    <ProTable<API.BookFlow>
      columns={columnsMap[activeKey]}
      actionRef={actionRef}
      //@ts-ignore
      request={async () => {
        const tableList = await getFlowInfo();
        let resList: API.BookFlow[] = [];
        //@ts-ignore
        resList = tableList.filter((item: API.BookFlow) => item.flowtounit === currentUser?.deptid);
        if (activeKey === 'toCheck') {
          //@ts-ignore
          resList = resList.filter((item: API.BookFlow) => item.flowstatus === 0);
        } else if (activeKey === 'Checked') {
          //@ts-ignore
          resList = resList.filter((item: API.BookFlow) => item.flowstatus === 1);
        } else if (activeKey === 'Over') {
          //@ts-ignore
          resList = resList.filter(
            (item: API.BookFlow) => item.flowstatus === 2 || item.flowstatus === 3,
          );
        }
        return Promise.resolve({
          data: resList,
          success: true,
        });
      }}
      toolbar={{
        title: '图书流入',
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
              key: 'Checked',
              tab: '已审核',
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
