import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright={false}
      links={[
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> Jarvlis GitHub
            </>
          ),
          href: 'https://github.com/Jarvlis',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
