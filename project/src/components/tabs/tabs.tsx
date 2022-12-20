import React, {useState} from 'react';
import {Film} from '../../types/film';
import {Comment} from '../../types/comment';
import {Tab} from '../../const';
import TabItem from '../tab/tabItem';
import OverviewTab from './overview-tab';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';

type Props = {
  film: Film,
  comments: Comment[]
}


const Tabs: React.FC<Props> = (props) => {
  const {film, comments} = props;
  const [activeTab, setActiveTab] = useState(Tab.Overview);

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
      {activeTab === Tab.Overview && <OverviewTab film={film}/>}
      {activeTab === Tab.Details && <DetailsTab film={film}/>}
      {activeTab === Tab.Reviews && <ReviewsTab comments={comments}/>}
    </div>
  );
};

export default Tabs;
