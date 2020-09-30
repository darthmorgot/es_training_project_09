import SiteMenuView from './view/site-menu';
import FilterView from './view/filter';
import BoardPresenter from './presenter/board';
import TasksModel from './model/tasks';
import {generateTask} from './mock/task';
import {generateFilter} from './mock/filter';
import {render} from './utils/render';

const TASK_COUNT = 22;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const tasksModel = new TasksModel();
tasksModel.setTask(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);

render(siteHeaderElement, new SiteMenuView());
render(siteMainElement, new FilterView(filters));

boardPresenter.init();
