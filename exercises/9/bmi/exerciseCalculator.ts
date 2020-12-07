type ratingDescription = 'you should exercise more!' | 'you met your target!' | 'way to go!';

interface exerciseResults {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: ratingDescription
  target: number
  average: number
}

interface args {
  target: number;
  hours: Array<number>
}

const parseArguments = (args: Array<string>): args => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = [];
  let target = 0;
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    if (i === 2) {
      target = Number(args[2]);
    } else {
      hours.push(Number(args[i]));
    }
  }
  return {
    target: target,
    hours: hours
  };
};

const exerciseCalculator = (target: number, hours: Array<number>): exerciseResults => {
  return hours.reduce((acc, curr, index, arr) => {
    acc.periodLength += 1;
    if (curr > 0) acc.trainingDays += 1;
    if (curr < target * 0.75) acc.success = false;
    if (index === arr.length - 1) {
      acc.average = arr.reduce((p, c, i) => p + (c - p) / (i + 1), 0);
      if (acc.average < 0.75 * target) {
        acc.rating = 1;
      } else if (acc.average <= 1.25 * target) {
        acc.rating = 2;
      } else {
        acc.rating = 3;
      }
      switch (acc.rating) {
        case 1:
          acc.ratingDescription = 'you should exercise more!';
          break;
        case 2:
          acc.ratingDescription = 'you met your target!';
          break;
        case 3:
          acc.ratingDescription = 'way to go!';
          break;
      }
    }
    return acc;
  }, <exerciseResults>{
    periodLength: 0,
    trainingDays: 0,
    success: true,
    rating: 0,
    ratingDescription: 'you should exercise more!',
    target: target,
    average: 0,
  });
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, hours));
} catch (e) {
  console.log('Error, ', e);
}