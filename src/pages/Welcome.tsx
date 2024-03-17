import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Alert, Card } from 'antd';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'欢迎来到图书信息平台 From Jarvlis'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
