import SiteMenuView from './view/site-menu';
import StatisticsView from './view/statistics';
import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import TasksModel from './model/tasks';
import FilterModel from './model/filter';
import Api from './api';
import {render, remove} from './utils/render';
import {MenuItem, UpdateType, FilterType} from './const';

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);

const tasksModel = new TasksModel();

const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

render(siteHeaderElement, siteMenuComponent);

filterPresenter.init();
boardPresenter.init();

api.getTasks()
  .then((tasks) => TasksModel.setTasks(UpdateType.INIT, tasks))
  .catch(() => TasksModel.setTasks(UpdateType.INIT, []));
