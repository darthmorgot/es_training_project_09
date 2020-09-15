import {COLORS} from '../const';
import {getRandomInteger} from '../utils';

const generateDescrition = () => {
  const descritions = [
    `This is example of task edit. You can set date and chose repeating days and color.`,
    `Example task with default color.`,
    `Example task with custom color.`,
    `Example task with custom color and without date.`,
    `Example task which marked as favorite.`,
    `Example task without date.`,
    `It is example of repeating task. It marks by wave.`,
    `This is task with missing deadline.`,
    `This is task with missing deadline. Deadline always marked by red line.`
  ];

  const randomIndex = getRandomInteger(0, descritions.length - 1);

  return descritions[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    descrition: generateDescrition(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
