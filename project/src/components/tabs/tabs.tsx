import React, {useState} from 'react';
import {Tab} from '../../const';
import TabItem from '../tab-item/tab-item';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(Tab.Details);
  const handleClickTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <TabItem key={Tab.Overview} isActive={Tab.Overview === activeTab} tabType={Tab.Overview} onClick={handleClickTab}/>
          <TabItem key={Tab.Details} isActive={Tab.Details === activeTab} tabType={Tab.Details} onClick={handleClickTab}/>
          <TabItem key={Tab.Reviews} isActive={Tab.Reviews === activeTab} tabType={Tab.Reviews} onClick={handleClickTab}/>
        </ul>
      </nav>
      {activeTab === Tab.Overview && <OverviewTab/>}
      {activeTab === Tab.Details && <DetailsTab/>}
      {activeTab === Tab.Reviews && <ReviewsTab/>}
    </div>
  );
};

export default Tabs;
