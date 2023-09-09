import React from 'react';
import PropTypes from 'prop-types';
import {Link, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import {Icon} from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';

const links = [];

const copyright = <div>Copyright <Icon type="copyright"/> 2018 颜如玉</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  };

  getChildContext() {
    const {location} = this.props;
    return {location};
  }

  getPageTitle() {
    const {getRouteData, location} = this.props;
    const {pathname} = location;
    let title = '颜如玉';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - 颜如玉`;
      }
    });
    return title;
  }

  render() {
    const {getRouteData} = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div>
          <div className={styles.south}>
          <span> 颜如玉养生会馆运营管理系统</span>
          {/* <img src='./images/yanruyuinages/timg7.jpg'></img> */}
          </div>
          <div className={styles.bg}>
            <img style={{ width: '100%',height:'100vh'}} src="./images/yanruyuinages/timg6.jpg" alt="背景图"/>
            <div className={styles.ad}>
              {/* <img src="./images/login_ad.png"/> */}
            </div>
            {
              getRouteData('UserLayout').map(item =>
                (
                  <Route
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  />
                )
              )
            }
          </div>

          <div>
            <GlobalFooter className={styles.footer} links={links} copyright={copyright}/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
