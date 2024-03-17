import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { getBooksInfo, getBorrowInfo } from '@/services/ant-design-pro/api';
import { useEffect, useState } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import { Column } from '@ant-design/charts';
import { Line } from '@ant-design/plots';
import { Col, Row } from 'antd';
// @ts-ignore
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const mydept = initialState?.currentUser?.deptid;
  const [lists, setLists] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [inLibrary, setInLibrary] = useState([]);
  const [responsive, setResponsive] = useState(false);
  const [monthData, setMonthData] = useState([{}]);
  const [yearData, setYearData] = useState([{}]);
  const dataList = {
    yearData: [
      {
        year: '2021',
        nums: yearData['2021'],
      },
      {
        year: '2022',
        nums: yearData['2022'],
      },
      {
        year: '2023',
        nums: yearData['2023'],
      },
    ],
    monthData: monthData,
  };
  const charlesConfig = (data: any) => {
    return {
      data: data,
      xField: 'year',
      yField: 'nums',
      loading: false,
      columnWidthRatio: 0.7,
      label: {
        layout: [
          { type: 'interval-adjust-position' }, // 数据标签自动调整位置
          { type: 'interval-hide-overlap' }, // 数据标签防遮挡
        ],
      },
      meta: {
        year: { alias: '年份' },
        nums: { alias: '数量' },
      },
    };
  };

  const LineConfig = (data: any) => {
    return {
      data: data,
      xField: 'month',
      yField: 'nums',
      loading: false,
      columnWidthRatio: 0.7,
      label: {
        layout: [
          { type: 'interval-adjust-position' }, // 数据标签自动调整位置
          { type: 'interval-hide-overlap' }, // 数据标签防遮挡
        ],
      },
      meta: {
        month: { alias: '月份' },
        nums: { alias: '数量' },
      },
    };
  };

  useEffect(() => {
    let isMounted = true; // Track whether component is mounted

    const loadData = async () => {
      try {
        const resBooksInfo = await getBooksInfo({});
        const resBorrowInfo = await getBorrowInfo(currentUser?.deptid);
        if (isMounted) {
          // @ts-ignore
          setAllBooks(resBooksInfo.filter((item: API.Book) => item.deptid === mydept));
          // @ts-ignore
          setLists(resBorrowInfo.filter((item: API.BookBorrow) => item.deptid === mydept));
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
        // Optionally handle error state here (e.g., show a message to the user)
      }
    };

    loadData();

    return () => {
      isMounted = false; // Indicate component has unmounted
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    setInLibrary(
      allBooks.filter((item: API.Book) => {
        return item.bookstatus === 0;
      }),
    );

    const years = ['2022', '2021', '2023'];
    const result: any = {};
    for (const year of years) {
      result[year] = lists.filter((item: API.BookBorrow) => {
        const [yearStr] = (item.borrowtime + '').split('-');
        return Number(yearStr) === Number(year);
      }).length;
    }
    setYearData(result);

    const months = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    const year = 2023;
    setMonthData(
      months.map((month) => ({
        month,
        nums: lists.filter((item: API.BookBorrow) => {
          const [yearStr, monthStr] = (item.borrowtime + '').split('-');
          return Number(yearStr) === year && Number(monthStr) === months.indexOf(month) + 1;
        }).length,
      })),
    );
  }, [lists, allBooks]);

  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          title="数据概览"
          extra={new Date().toLocaleDateString()}
          split={responsive ? 'horizontal' : 'vertical'}
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: '本单位总图书数',
                    value: allBooks.length,
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '当前在库图书数',
                    value: inLibrary.length,
                    status: 'success',
                  }}
                />
              </ProCard>
            </ProCard>
            <ProCard title="2023年月度借阅数量" bordered={false} size="small">
              <Line {...LineConfig(dataList.monthData)} />
            </ProCard>
          </ProCard>
          <ProCard title="借阅年份表" bordered={false} size="small">
            <Row justify="space-around">
              <Col span="7">
                <Column {...charlesConfig(dataList.yearData)} />
              </Col>
            </Row>
          </ProCard>
        </ProCard>
      </RcResizeObserver>
    </>
  );
};
