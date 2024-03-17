import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import {
  BookFlowIn,
  BookFlowReject,
  BookFlowReturn,
  getFlowInfo,
} from '@/services/ant-design-pro/api';
// @ts-ignore
import { useModel } from '@@/plugin-model/useModel';
import { message } from 'antd';

const BookOut: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const actionRef = useRef<ActionType>();
  const handleClick = (record: API.BookFlow, allowBook: boolean) => {
    // 在这里添加你的事件处理代码
    return async () => {
      // 审核状态和已借阅状态
      if (allowBook) {
        let res;
        if (record.flowstatus === 0) {
          // 审核状态
          res = await BookFlowIn(record);
        } else {
          // 已借阅状态
          res = await BookFlowReturn(record);
        }
        if (res) {
          message.success('同意成功');
          setTimeout(() => {
            actionRef.current?.reload(); // 刷新表单
          }, 0);
          return true;
        } else {
          message.error('同意失败');
          return false;
        }
      } else {
        // 如果拒绝直接将状态设置成3
        const res = await BookFlowReject(record);
        if (res) {
          message.success('同意成功');
          setTimeout(() => {
            actionRef.current?.reload(); // 刷新表单
          }, 0);
          return true;
        } else {
          message.error('同意失败');
          return false;
        }
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
        <a key="link" onClick={handleClick(record, true)}>
          同意
        </a>,
        <a key="link" onClick={handleClick(record, false)}>
          拒绝
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
        let resList = [];
        //@ts-ignore
        resList = tableList.filter((item: API.BookFlow) => item.ownerunit === currentUser?.deptid);
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
        title: '图书流出',
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
              tab: '已借出',
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
export default BookOut;
//@ts-ignore
