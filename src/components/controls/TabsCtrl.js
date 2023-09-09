import React from 'react';
import { Tabs } from 'antd';
import flatten from 'lodash/flatten';
import castArray from 'lodash/castArray';

import  './style.less';

const { TabPane } = Tabs;

export default class Control extends React.Component {
  render() {
    const { defaultActiveKey = '0', tabBarStyle = { margin: 0 }, size = 'small', tabPosition = 'top', tabPaneStyle, onChange, children, tabs = [], props = {} } = this.props;
    const items = flatten(castArray(children || []));
    return (
      <div className={`tab ${`tab_${tabPosition}`}`}>
        <Tabs size={size} tabPosition={tabPosition} defaultActiveKey={defaultActiveKey} tabBarStyle={tabBarStyle} onChange={onChange} {...props}>
          {
            items.map((item, idx) => {
              const flag = typeof (tabs[idx]) === 'object';
              return (
                <TabPane tab={flag ? tabs[idx].name : tabs[idx]} key={flag ? `${tabs[idx].value}` : `${Number(idx)}`} >
                  <div className={`${tabPaneStyle || ''}`}>{item}</div>
                </TabPane>
              );
            })
          }
        </Tabs>
      </div>
    );
  }
}
